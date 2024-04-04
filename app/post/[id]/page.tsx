import { notFound } from 'next/navigation';
import { getComments, getPost } from '@/app/post/[id]/repositories';
import { getLikeStatus } from '@/app/post/[id]/services';
import { unstable_cache as nextCache } from 'next/cache';
import CommentInput from '@/app/post/[id]/components/comment-input';
import React from 'react';
import { getUserProfile } from '@/libs/session';
import PostContainer from '@/app/post/[id]/components/PostContainer';

const PostDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const user = await getUserProfile();

  const getCachedPost = nextCache(getPost, ['post-detail'], {
    tags: ['post-detail'],
    revalidate: 30,
  });

  const getCachedComments = (postId: number) => {
    const cachedOperation = nextCache(getComments, ['post-comments'], {
      tags: [`post-comments-${postId}`],
    });
    return cachedOperation(postId);
  };

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
  const initComments = await getCachedComments(id);

  return (
    <div className="p-5 relative h-screen">
      <PostContainer
        post={post}
        postId={id}
        isLiked={isLiked}
        likeCount={likeCount}
        initComments={initComments}
        userId={user.id}
      />
      <CommentInput postId={id} userId={user.id} />
    </div>
  );
};

export default PostDetail;
