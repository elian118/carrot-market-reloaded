import { getRoom } from '@/app/chats/[id]/repositories';
import { getUser } from '@/libs/session';

export const enterRoom = async (id: string) => {
  const room = await getRoom(id);
  if (room) {
    const sessionUser = await getUser();
    const canSee = room.users.find((user) => user.id === sessionUser.id);
    if (!canSee) return null;
  }
  return room;
};
