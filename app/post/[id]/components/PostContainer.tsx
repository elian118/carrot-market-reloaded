'use client';

import PostContent from '@/app/post/[id]/components/post-content';
import CommentList from '@/app/post/[id]/components/comment-list';
import { InitialComments, InitialPost } from '@/app/post/[id]/types';
import { useComment } from '@/app/post/[id]/hooks';

type PostContainerProps = {
  post: InitialPost;
  postId: number;
  isLiked: boolean;
  likeCount: number;
  initComments: InitialComments;
  userId: number;
};

const PostContainer = ({
  post,
  postId,
  isLiked,
  likeCount,
  initComments,
  userId,
}: PostContainerProps) => {
  const { isFolded, setIsFolded } = useComment();

  return (
    <div className="h-full overflow-hidden">
      {post && (
        <PostContent
          post={post}
          postId={postId}
          isLiked={isLiked}
          likeCount={likeCount}
          foldState={[isFolded, setIsFolded]}
        />
      )}
      <hr className="mb-4 mt-24" />
      <CommentList
        postId={postId}
        initComments={initComments}
        userId={userId}
        foldState={[isFolded, setIsFolded]}
      />
    </div>
  );
};

export default PostContainer;
