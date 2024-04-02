import { notFound } from 'next/navigation';
import { getPost } from '@/app/post/[id]/repositories';
import Image from 'next/image';
import { formatToTimeAgo } from '@/libs/utils';
import { EyeIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { dislikePost, getIsLiked, likePost } from '@/app/post/[id]/services';

const PostDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }
  const post = await getPost(id);
  if (!post) {
    return notFound();
  }

  const isLiked = await getIsLiked(id);

  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={post.user.avatar!}
          alt={post.user.username}
        />
        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(post.created_at.toJSON())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <form action={isLiked ? dislikePost : likePost} method="POST">
          <input type="hidden" name="postId" value={id} />
          <button
            className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2`}
          >
            <HandThumbUpIcon className="size-5" />
            <span>공감하기 ({post._count.likes})</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
