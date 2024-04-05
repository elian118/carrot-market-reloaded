'use server';

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import db from '@/libs/db';
import { notFound, redirect } from 'next/navigation';
import { SessionContent, SessionDialogContent } from '@/libs/types';

// 세션 가져오기 - 복호화 된 쿠키 반환
export const getSession = () => {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'delicious-carrot',
    password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD!,
  });
};

// 사용자 정보(id) 가져오기
export const getUserProfile = async () => {
  const session = await getSession(); // 복호화 된 쿠키 반환
  const user = session.id
    ? await db.user.findUnique({
        where: { id: session.id },
        select: { id: true, username: true, avatar: true },
      })
    : null;
  return user ? user : notFound(); // 확인된 사용자 정보 없다면 404 처리
};

export const getSessionId = async () => {
  const session = await getSession(); // 복호화 된 쿠키 반환
  return session.id;
};

// 로그인 - 사용자 정보를 암호화 후 쿠키에 저장
export const saveLoginSession = async (user: SessionContent) => {
  const session = await getSession();
  session.id = user.user_id ?? user.id;
  await session.save(); // 정보 암호화 후 쿠키에 저장
  // SMS 로그인이라면, 인증토큰 삭제
  user.user_id && (await db.sMSToken.delete({ where: { id: user.id } }));
  redirect('/profile');
};

// 로그아웃 - 쿠키에서 사용자 정보 제거
export const logout = async () => {
  'use server';
  const session = await getSession();
  session.destroy(); // 쿠키 제거
  redirect('/');
};

export const getDialogSession = () => {
  return getIronSession<SessionDialogContent>(cookies(), {
    cookieName: 'carrot-dialog',
    password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD!,
  });
};

export const getDialogContent = async () => await getDialogSession();

export const saveDialogData = async (props: SessionDialogContent) => {
  const { type, message, fnCode, args, nextPage } = props;
  const dialogSession = await getDialogSession();
  dialogSession.type = type;
  dialogSession.message = message;
  dialogSession.fnCode = fnCode;
  dialogSession.args = args;
  dialogSession.nextPage = nextPage;
  await dialogSession.save(); // 정보 암호화 후 쿠키에 저장
};

export const clearDialogSession = async () => {
  const dialogSession = await getDialogSession();
  dialogSession.destroy();
};
