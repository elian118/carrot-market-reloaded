'use client';

import React, { useEffect } from 'react';
import Input from '@/components/input';
import Button from '@/components/button';
import { useComment } from '@/app/post/[id]/hooks';
import { CommentRefIds } from '@/app/post/[id]/types';

const CommentInput = ({ postId, userId }: CommentRefIds) => {
  const { errors, register, reset, onValid, setCommentRefId } = useComment();

  useEffect(() => {
    setCommentRefId({ postId, userId });
  }, [postId, setCommentRefId, userId]);

  return (
    <div className="flex flex-col gap-2 justify-between absolute bottom-3 left-0 max-w-screen-sm w-full mx-auto p-6 bg-gray-100 dark:bg-gray-800">
      <form className="flex gap-2" action={onValid} onSubmit={(e) => reset(e)}>
        <div className="w-full">
          <Input
            type="text"
            errors={[errors.payload?.message ?? '']}
            required
            {...register('payload')}
          />
        </div>
        <div className="w-24">
          <Button type="submit" outlined>
            등록
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
