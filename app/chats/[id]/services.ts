'use server';

import { createMessage, getMessage, getRoom } from '@/app/chats/[id]/repositories';
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

export const saveMessage = async (payload: string, chatRoomId: string) => {
  const user = await getUserProfile();
  await createMessage(payload, chatRoomId, user.id);
};
