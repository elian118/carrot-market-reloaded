'use client';

import Image from 'next/image';
import { formatToTimeAgo, parsePhotoUrl } from '@/libs/utils';
import { EyeIcon } from '@heroicons/react/24/solid';
import { LikeButton } from '@/app/post/[id]/components/views';
import Button from '@/components/button';
import { InitialPost } from '@/app/post/[id]/types';

type PostProps = {
  post: InitialPost;
  postId: number;
  isLiked: boolean;
  likeCount: number;
  foldState: [boolean, (val: boolean) => void];
};

const PostContent = ({ post, postId, isLiked, likeCount, foldState }: PostProps) => {
  const [isFolded] = foldState;

  return (
    <div className={`${isFolded ? 'h-3/4' : 'h-1/2'} overflow-y-auto`}>
      <div className="flex items-center gap-2 mb-2">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={parsePhotoUrl(post!.user.avatar, 'avatar')}
          alt={post!.user.username}
        />
        <div>
          <span className="text-sm font-semibold">{post!.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(post!.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post!.title}</h2>
      <p className="mb-5">{post!.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post!.views}</span>
        </div>
        <div className="flex items-start gap-2">
          <LikeButton isLiked={isLiked} likeCount={likeCount} postId={postId} />
          <Button type="button" href="/life" rounded outlined>
            목록으로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
