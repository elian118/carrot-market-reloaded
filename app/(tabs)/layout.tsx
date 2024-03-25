import TabBar from '@/components/tab-bar';
import LogoutBtn from '@/components/logout-btn';
import { getUser } from '@/libs/session';

const TabLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return (
    <div>
      {children}
      {user.id && <LogoutBtn />}
      <TabBar />
    </div>
  );
};

export default TabLayout;
