import React from 'react';
import { getUser } from '@/libs/session';
import LogoutBtn from '@/components/logout-btn';

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return (
    <div>
      {children}
      {user.id && <LogoutBtn />}
    </div>
  );
};

export default ChatLayout;
