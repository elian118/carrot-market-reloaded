import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import db from '@/libs/db';
import { notFound, redirect } from 'next/navigation';

type SessionContent = {
  id?: number;
};

export const getSession = () => {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'delicious-carrot',
    password: process.env.COOKIE_PASSWORD!,
  });
};

export const getUser = async () => {
  const session = await getSession(); // 복호화 된 쿠키 반환
  const user = session.id
    ? await db.user.findUnique({ where: { id: session.id } })
    : null;
  return user ? user : notFound(); // 확인된 사용자 정보 없다면 404 처리
};

export const logout = async () => {
  'use server';
  const session = await getSession();
  session.destroy(); // 쿠키 제거
  redirect('/');
};
