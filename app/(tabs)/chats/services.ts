import { getChatRoomList, getUserChatRoomIds } from '@/app/(tabs)/chats/repositories';
import { removeDupElements } from '@/libs/utils';

export const getUserChatRooms = async (userId: number) => {
  return await getChatRoomList(userId);
};

export const getUserChatCounts = async (userId: number) => {
  const ids = await getUserChatRoomIds(userId);
  const pureIds = removeDupElements(ids.map((e) => e.chat_room_id));
  return pureIds.length;
};
