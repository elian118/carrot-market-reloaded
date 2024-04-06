import { getUserProfile, logout } from '@/libs/session';
import { PlusIcon } from '@heroicons/react/24/solid';
import IconButton from '@/components/icon-button';

const Live = async () => {
  const user = await getUserProfile();

  return (
    <div>
      <h1 className="text-xl">어서 오세요 {user?.username}님!</h1>
      <h1 className="text-4xl">여기는 라이브 쇼핑 페이지입니다.</h1>
      <div className="fixed bottom-24 right-8">
        <IconButton icon={<PlusIcon className="size-10" />} href="/streams/add" />
      </div>
      <form action={logout}>
        <button>Log out</button>
      </form>
    </div>
  );
};

export default Live;
