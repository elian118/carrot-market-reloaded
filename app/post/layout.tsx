import LogoutBtn from '@/components/logout-btn';
import { getUser } from '@/libs/session';

const PostLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return (
    <div>
      {children}
      {user.id && <LogoutBtn />}
    </div>
  );
};

export default PostLayout;
