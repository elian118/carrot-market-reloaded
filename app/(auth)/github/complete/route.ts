import { NextRequest } from 'next/server';
import { saveLoginSession } from '@/libs/session';
import {
  getAccessToken,
  getGitHubUserProfile,
  getUserEmail,
} from '@/app/(auth)/github/complete/services';
import {
  createGitHubUser,
  getGitHubUser,
} from '@/app/(auth)/github/complete/repositories';

export const GET = async (req: NextRequest) => {
  const access_token: string = await getAccessToken(req);
  const profile = await getGitHubUserProfile(req, access_token);
  const email = await getUserEmail(req, access_token);

  // 1. 기존 사용자일때
  const user = await getGitHubUser(profile.id);
  user && (await saveLoginSession(user)); // 로그인

  // 2. 신규 사용자일때 - 깃허브 사용자로 자동가입 후 로그인
  const newUser = await createGitHubUser(profile, email);
  newUser && (await saveLoginSession(newUser)); // 로그인
};
