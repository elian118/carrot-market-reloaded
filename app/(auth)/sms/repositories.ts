import db from '@/libs/db';
import crypto from 'crypto';

export const getTokenId = async (token: string) => {
  return db.sMSToken.findUnique({
    where: { token },
    select: { id: true },
  });
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

export const delToken = async (phone: string) => {
  return db.sMSToken.deleteMany({
    where: {
      user: { phone },
    },
  });
};

export const getSMSToken = async (token: string) => {
  return db.sMSToken.findUnique({
    where: { token },
    select: { id: true, user_id: true },
  });
};
