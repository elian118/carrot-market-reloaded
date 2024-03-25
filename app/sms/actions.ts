'use server';

import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';
import { ActionState } from '@/app/sms/types';
import crypto from 'crypto';
import db from '@/libs/db';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    '유효하지 않은 전화번호입니다.',
  );

const tokenSchema = z.coerce.number().min(100000).max(999999);

const getToken = async (): Promise<any> => {
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });
  if (exists) {
    return getToken(); // 재귀 호출
  } else {
    return token;
  }
};

export const smsLogIn = async (prevState: ActionState, formData: FormData) => {
  const phone = formData.get('phone');
  const token = formData.get('token');

  if (!prevState.token) {
    const phoneValid = phoneSchema.safeParse(phone);
    // return {
    //   token: phoneValid.success,
    //   error: !phoneValid.success ? phoneValid.error.flatten() : undefined,
    // };
    if (!phoneValid.success) {
      return {
        token: false,
        error: phoneValid.error.flatten(),
      };
    } else {
      // 이전 토큰 삭제
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: phoneValid.data,
          },
        },
      });
      // 토큰 생성
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            // SMSToken 테이블은 User 테이블과 JOIN 관계 - 데이터 생성 시 연결된 사용자 정보가 꼭 필요하다.
            // connectOrCreate: 연결할 사용자 정보가 있으면 연결, 없으면 신규 사용자 정보 생성
            // * 참고: 사용자 정보가 확실히 존재할 수밖에 없다면 create 사용으로 충분
            connectOrCreate: {
              where: {
                phone: phoneValid.data,
              },
              // 기존 사용자 중 인증에 사용된 전화번호가 없다면 신규 사용자로 추가
              create: {
                username: crypto.randomBytes(10).toString('hex'),
                phone: phoneValid.data,
              },
            },
          },
        },
      });
      // 트윌리오로 토큰 보내기
      return { token: true };
    }
  } else {
    const tokenValid = tokenSchema.safeParse(token);
    if (!tokenValid.success) {
      return { token: !tokenValid.success, error: tokenValid.error.flatten() };
    } else redirect('/'); // Todo: 로그인 성공 직후 페이지로 변경
  }
};
