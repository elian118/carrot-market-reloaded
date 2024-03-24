import { NextRequest } from 'next/server';
import { notFound } from 'next/navigation';
import db from '@/libs/db';
import { saveLoginSession } from '@/libs/session';

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) return notFound();

  const baseUrl = 'https://github.com/login/oauth/access_token';
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  });
  const accessTokenUrl = `${baseUrl}?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenUrl, {
    method: 'POST',
    headers: { Accept: 'application/json' },
  });
  const { error, access_token } = await accessTokenResponse.json();

  if (error) return new Response(null, { status: 400 });

  const userProfileResponse = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-cache',
  });
  const { id, avatar_url, login } = await userProfileResponse.json();

  // 1. 기존 사용자일때
  const user = await db.user.findUnique({
    where: { github_id: String(id) },
    select: { id: true },
  });
  user && (await saveLoginSession(user)); // 로그인

  // 2. 신규 사용자일때 - 깃허브 사용자로 자동가입 후 로그인
  const newUser = await db.user.create({
    data: {
      username: login,
      github_id: String(id),
      avatar: avatar_url,
    },
    select: { id: true },
  });
  newUser && (await saveLoginSession(newUser)); // 로그인
};
