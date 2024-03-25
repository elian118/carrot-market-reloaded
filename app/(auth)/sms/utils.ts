import db from '@/libs/db';
import crypto from 'crypto';
import twilio from 'twilio';

export const doesTokenExists = async (token: number) => {
  const exists = await db.sMSToken.findUnique({
    where: { token: token.toString() },
    select: { id: true },
  });
  return Boolean(exists);
};

export const getToken = async (): Promise<any> => {
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await db.sMSToken.findUnique({
    where: { token },
    select: { id: true },
  });
  return exists ? await getToken() : token;
};

export const createToken = async (token: string, phone: string) => {
  await db.sMSToken.create({
    data: {
      token,
      user: {
        connectOrCreate: {
          where: { phone: phone },
          create: {
            username: crypto.randomBytes(10).toString('hex'),
            phone: phone,
          },
        },
      },
    },
  });
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
