import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import db from '@/libs/db';
import { notFound, redirect } from 'next/navigation';
import { SessionContent } from '@/libs/types';

// 세션 가져오기 - 복호화 된 쿠키 반환
export const getSession = () => {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'delicious-carrot',
    password: process.env.COOKIE_PASSWORD!,
  });
};

// 사용자 정보(id) 가져오기
export const getUser = async () => {
  const session = await getSession(); // 복호화 된 쿠키 반환
  const user = session.id
    ? await db.user.findUnique({ where: { id: session.id } })
    : null;
  return user ? user : notFound(); // 확인된 사용자 정보 없다면 404 처리
};

// 로그인 - 사용자 정보를 암호화 후 쿠키에 저장
export const saveLoginSession = async (user: SessionContent) => {
  const session = await getSession();
  session.id = user.id;
  await session.save(); // 정보 암호화 후 쿠키에 저장
  return redirect('/profile');
};

// 로그아웃 - 쿠키에서 사용자 정보 제거
export const logout = async () => {
  'use server';
  const session = await getSession();
  session.destroy(); // 쿠키 제거
  redirect('/');
};
