import { getUserChatCounts, getUserChatRooms } from '@/app/(tabs)/chats/services';
import { getUserProfile } from '@/libs/session';
import ChatRoomsWrapper from '@/app/(tabs)/chats/components/chat-rooms-wrapper';

const Chats = async () => {
  const user = await getUserProfile();
  const initialChatRooms = await getUserChatRooms(user.id);
  const totalChatRoomCounts = await getUserChatCounts(user.id);

  return (
    <div className="p-4">
      <ChatRoomsWrapper
        initialChatRooms={initialChatRooms}
        user={user}
        totalChatRoomCounts={totalChatRoomCounts}
      />
    </div>
  );
};

export default Chats;
