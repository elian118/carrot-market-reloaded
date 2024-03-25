import { NextRequest } from 'next/server';
import db from '@/libs/db';
import { saveLoginSession } from '@/libs/session';
import {
  getAccessToken,
  getEmailId,
  getUserEmail,
  getUserProfile,
} from '@/app/(auth)/github/complete/utils';

export const GET = async (req: NextRequest) => {
  const access_token: string = await getAccessToken(req);
  const profile = await getUserProfile(req, access_token);
  const { id, avatar_url, twitter_username, name, login } = profile;
  const email = await getUserEmail(req, access_token);

  // 1. 기존 사용자일때
  const user = await db.user.findUnique({
    where: { github_id: String(id) },
    select: { id: true },
  });
  user && (await saveLoginSession(user)); // 로그인

  // 2. 신규 사용자일때 - 깃허브 사용자로 자동가입 후 로그인
  const newUser = await db.user.create({
    data: {
      username: twitter_username ?? name ?? email ? getEmailId(email) : login,
      github_id: String(id),
      avatar: avatar_url,
      email: email,
    },
    select: { id: true },
  });
  newUser && (await saveLoginSession(newUser)); // 로그인
};
