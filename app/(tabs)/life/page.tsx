import { getUser, logout } from '@/libs/session';

const Life = async () => {
  const user = await getUser();

  return (
    <div>
      <h1 className="text-xl">어서 오세요 {user?.username}님!</h1>
      <h1 className="text-4xl">여기는 생활 페이지입니다.</h1>
      <form action={logout}>
        <button>Log out</button>
      </form>
    </div>
  );
};

export default Life;
