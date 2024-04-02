import { getPosts } from '@/app/(tabs)/life/repositories';
import Link from 'next/link';
import { formatToTimeAgo } from '@/libs/utils';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: '동네생활',
};

const Life = async () => {
  const posts = await getPosts();

  return (
    <div className="p-5 flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/post/${post.id}`}
          className="pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex flex-col gap-2 last:pb-0 last:border-b-0"
        >
          <h2 className="text-white text-lg font-semibold">{post.title}</h2>
          <p className="mb-2">{post.description}</p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-4 items-center">
              <span>{formatToTimeAgo(post.created_at.toString())}</span>
              <span>﹒</span>
              <span>조회 {post.views}</span>
            </div>
            <div className="flex gap-4 items-center *:flex *:gap-2 *:items-center">
              <span>
                <HandThumbUpIcon className="size-4" />
                {post._count.likes}
              </span>
              <span>
                <ChatBubbleBottomCenterIcon className="size-4" />
                {post._count.comments}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Life;
