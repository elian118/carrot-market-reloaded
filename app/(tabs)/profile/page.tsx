import { logout } from '@/libs/session';
import { Suspense } from 'react';
import { Username, Loading } from '@/app/(tabs)/profile/components';

const Profile = async () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Username />
      </Suspense>
      <h1 className="text-4xl">여기는 프로필 페이지입니다.</h1>
      <form action={logout}>
        <button>Log out</button>
      </form>
    </div>
  );
};

export default Profile;
