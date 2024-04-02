import { notFound } from 'next/navigation';
import { getPost } from '@/app/post/[id]/repositories';
import Image from 'next/image';
import { EyeIcon } from '@heroicons/react/24/solid';
import { getLikeStatus } from '@/app/post/[id]/services';
import { unstable_cache as nextCache } from 'next/cache';
import { formatToTimeAgo } from '@/libs/utils';
import { LikeButton } from '@/app/post/[id]/components';

const PostDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  const getCachedPost = nextCache(getPost, ['post-detail'], {
    tags: ['post-detail'],
    revalidate: 30,
  });

  const getCachedLikedStatus = (postId: number) => {
    const cachedOperation = nextCache(getLikeStatus, ['product-like-status'], {
      tags: [`like-status-${postId}`],
    });
    return cachedOperation(postId);
  };

  if (isNaN(id)) return notFound();

  const post = await getCachedPost(id);
  if (!post) return notFound();

  const { likeCount, isLiked } = await getCachedLikedStatus(id);

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
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
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
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
      </div>
    </div>
  );
};

export default PostDetail;
