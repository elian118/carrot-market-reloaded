import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

type SessionContent = {
  id?: number;
};

export const getSession = () => {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'delicious-carrot',
    password: process.env.COOKIE_PASSWORD!,
  });
};
