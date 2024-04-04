import LogoutBtn from '@/components/logout-btn';
import { getUserProfile } from '@/libs/session';

const PostLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserProfile();

  return (
    <div>
      {children}
      {user.id && <LogoutBtn />}
    </div>
  );
};

export default PostLayout;
