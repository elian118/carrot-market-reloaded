import { getUser, logout } from '@/libs/session';

const Profile = async () => {
  const user = await getUser();

  return (
    <div>
      <h1>어서 오세요 {user?.username}님!</h1>
      <form action={logout}>
        {/*<input type="submit" value="Log out" />*/}
        <button>Log out</button>
      </form>
    </div>
  );
};

export default Profile;
