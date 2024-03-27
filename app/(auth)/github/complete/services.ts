import { setQueryLog } from '@/libs/utils';
import db from '@/libs/db';
import { getEmailId } from '@/app/(auth)/github/complete/utils';

export const createGitHubUser = async (profile: any, email: string | null) => {
  setQueryLog('깃허브 회원 가입 / 계정 생성');
  const { id, avatar_url, twitter_username, name, login } = profile;
  return db.user.create({
    data: {
      username: twitter_username ?? name ?? email ? getEmailId(email) : login,
      github_id: String(id),
      avatar: avatar_url,
      email: email,
    },
    select: { id: true },
  });
};

export const getGitHubUser = async (profileId: number) => {
  setQueryLog('깃허브 회원 조회');
  return db.user.findUnique({
    where: { github_id: String(profileId) },
    select: { id: true },
  });
};
