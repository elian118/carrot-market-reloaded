import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatBubbleOvalLeftEllipsisIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from '@heroicons/react/24/solid';
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatBubbleOvalLeftEllipsisIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from '@heroicons/react/24/outline';

export const tabs = [
  {
    title: '홈',
    link: '/products',
    icon: <OutlineHomeIcon className="size-7 group-hover:text-orange-600" />,
    selectedIcon: <SolidHomeIcon className="size-7 group-hover:text-orange-600" />,
  },
  {
    title: '동네생활',
    link: '/life',
    icon: <OutlineNewspaperIcon className="size-7 group-hover:text-orange-600" />,
    selectedIcon: <SolidNewspaperIcon className="size-7 group-hover:text-orange-600" />,
  },
  {
    title: '채팅',
    link: '/chats',
    icon: (
      <OutlineChatBubbleOvalLeftEllipsisIcon className="size-7 group-hover:text-orange-600" />
    ),
    selectedIcon: (
      <SolidChatBubbleOvalLeftEllipsisIcon className="size-7 group-hover:text-orange-600" />
    ),
  },
  {
    title: '쇼핑',
    link: '/live',
    icon: <OutlineVideoCameraIcon className="size-7 group-hover:text-orange-600" />,
    selectedIcon: <SolidVideoCameraIcon className="size-7 group-hover:text-orange-600" />,
  },
  {
    title: '나의 당근',
    link: '/profile',
    icon: <OutlineUserIcon className="size-7 group-hover:text-orange-600" />,
    selectedIcon: <SolidUserIcon className="size-7 group-hover:text-orange-600" />,
  },
];
