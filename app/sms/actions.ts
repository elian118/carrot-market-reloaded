'use server';

import { z } from 'zod';
import validator from 'validator';
import { ActionState } from '@/app/sms/types';
import db from '@/libs/db';
import { saveLoginSession } from '@/libs/session';
import { createToken, doesTokenExists, getToken } from '@/app/sms/utils';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    '유효하지 않은 전화번호입니다.',
  );

const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(doesTokenExists, '존재하지 않는 토큰입니다.');

export const smsLogIn = async (
  prevState: ActionState,
  formData: FormData,
): Promise<any> => {
  const phone = formData.get('phone');
  const token = formData.get('token');

  if (!prevState.token) {
    const phoneValid = phoneSchema.safeParse(phone);
    if (!phoneValid.success) {
      return {
        token: false,
        error: phoneValid.error.flatten(),
      };
    } else {
      // 이전 토큰 삭제
      await db.sMSToken.deleteMany({
        where: {
          user: { phone: phoneValid.data },
        },
      });
      // 토큰 생성
      const token = await getToken();
      await createToken(token, phoneValid.data);
      // 트윌리오로 토큰 보내기
      // await sendTokenToTwilio(token); // fixme: 트윌리오에 문제가 있어 주석으로 차단.
      return { token: true };
    }
  } else {
    const tokenValid = await tokenSchema.spa(token);
    if (!tokenValid.success) {
      return { token: !tokenValid.success, error: tokenValid.error.flatten() };
    } else {
      // 토큰에서 사용자 아이디 가저오기
      const token = await db.sMSToken.findUnique({
        where: { token: tokenValid.data.toString() },
        select: { id: true, user_id: true },
      });
      // 로그인
      token && (await saveLoginSession(token));
    }
  }
};
