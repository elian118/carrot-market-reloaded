import { getUser, logout } from '@/libs/session';

const Profile = async () => {
  const user = await getUser();

  return (
    <div>
      <h1>어서 오세요 {user?.username}님! 여기는 제품 페이지입니다.</h1>
      <form action={logout}>
        <button>Log out</button>
      </form>
    </div>
  );
};

export default Profile;
