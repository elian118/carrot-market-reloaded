'use server';

import { getMessage, getRoom } from '@/app/chats/[id]/repositories';
import { getUserProfile } from '@/libs/session';

export const enterRoom = async (id: string) => {
  const room = await getRoom(id);
  if (room) {
    const sessionUser = await getUserProfile();
    const canSee = room.users.find((user) => user.id === sessionUser.id);
    if (!canSee) return null;
  }
  return room;
};

export const getMessages = async (id: string) => await getMessage(id);
