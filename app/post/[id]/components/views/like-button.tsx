'use client';

import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as OutlinedHandThumbUpIcon } from '@heroicons/react/24/outline';
import { dislikePost, likePost } from '@/app/post/[id]/services';
import { useOptimistic } from 'react';

type LikeButtonProps = {
  postId: number;
  isLiked: boolean;
  likeCount: number;
};

export const LikeButton = ({ postId, likeCount, isLiked }: LikeButtonProps) => {
  const [state, reducer] = useOptimistic({ isLiked, likeCount }, (prevState) => ({
    isLiked: !prevState.isLiked,
    likeCount: prevState.isLiked ? prevState.likeCount - 1 : prevState.likeCount + 1,
  }));

  const onClick = async () => {
    reducer(undefined);
    isLiked ? await dislikePost(postId) : await likePost(postId);
  };

  return (
    <button
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 ${isLiked ? 'bg-orange-500 text-white border-orange-500' : 'hover:bg-neutral-800'}`}
      onClick={onClick}
    >
      {state.isLiked ? (
        <HandThumbUpIcon className="size-5" />
      ) : (
        <OutlinedHandThumbUpIcon className="size-5" />
      )}
      {state.isLiked ? (
        <span> {state.likeCount}</span>
      ) : (
        <span>공감하기 ({state.likeCount})</span>
      )}
    </button>
  );
};
