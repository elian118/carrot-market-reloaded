import { getUserProfile } from '@/libs/session';

export const Username = async () => {
  await new Promise((res) => setTimeout(res, 3000));
  const user = await getUserProfile();

  return <h1 className="text-xl">어서 오세요 {user?.username}님!</h1>;
};
