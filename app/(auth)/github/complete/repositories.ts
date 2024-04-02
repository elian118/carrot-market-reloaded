import { setQueryLog } from '@/libs/utils';
import db from '@/libs/db';
import { getEmailId } from '@/app/(auth)/github/complete/services';

export const createGitHubUser = async (profile: any, email: string | null) => {
  const { id, avatar_url, twitter_username, name, login } = profile;
  const result = await db.user.create({
    data: {
      username: twitter_username ?? name ?? email ? getEmailId(email) : login,
      github_id: String(id),
      avatar: avatar_url,
      email: email,
    },
    select: { id: true },
  });
  setQueryLog('깃허브 회원 가입 / 계정 생성', 'createGitHubUser', result);
  return result;
};

export const getGitHubUser = async (profileId: number) => {
  const result = await db.user.findUnique({
    where: { github_id: String(profileId) },
    select: { id: true },
  });
  setQueryLog('깃허브 회원 조회', 'getGitHubUser', result);
  return result;
};
