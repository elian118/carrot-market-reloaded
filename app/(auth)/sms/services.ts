import crypto from 'crypto';
import {
  createToken,
  delToken,
  getSMSToken,
  getTokenId,
} from '@/app/(auth)/sms/repositories';
import { saveLoginSession } from '@/libs/session';
import twilio from 'twilio';

export const getToken = async (): Promise<any> => {
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await getTokenId(token);
  return exists ? await getToken() : token;
};

export const doesTokenExists = async (token: number) => {
  const exists = await getTokenId(token.toString());
  return Boolean(exists);
};

export const validChkWithSMS = async (phone: string) => {
  // 이전 토큰 삭제
  await delToken(phone);
  // 토큰 생성
  const token = await getToken();
  await createToken(token, phone);
  // 트윌리오로 토큰 보내기
  // await sendTokenToTwilio(token); // fixme: 트윌리오에 문제가 있어 주석으로 차단.
  return { token: true };
};

export const loginWithSMS = async (aToken: string) => {
  // 토큰에서 사용자 아이디 가저오기
  const token = await getSMSToken(aToken);
  // 로그인
  token && (await saveLoginSession(token));
};

export const sendTokenToTwilio = async (token: string) => {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  await client.messages.create({
    body: `당근 인증번호: ${token}`,
    from: process.env.TWILIO_PHONE_NUMBER!,
    // to: phoneValid.data // 실제 서비스에서 활성화 - 트윌리오 계정 업그레이드 선행 필요
    to: process.env.MY_PHONE_NUMBER!,
  });
};
