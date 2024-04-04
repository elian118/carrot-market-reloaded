import React from 'react';
import { getUserProfile } from '@/libs/session';
import LogoutBtn from '@/components/logout-btn';

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserProfile();

  return (
    <div>
      {children}
      {user.id && <LogoutBtn />}
    </div>
  );
};

export default ChatLayout;
