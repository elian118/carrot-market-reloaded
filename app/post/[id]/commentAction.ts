import { createComment } from '@/app/post/[id]/repositories';
import { commentScheme } from '@/app/post/[id]/schemas';
import { FormDataType } from '@/app/post/[id]/types';

export const setCommentInfo = async (
  formData: FormData,
  postId: number,
  userId: number,
) => {
  const data: FormDataType = {
    payload: formData.get('payload'),
  };

  const result = commentScheme.safeParse(data);

  if (!result.success) return result.error.flatten();
  else {
    try {
      await createComment(postId, userId, result.data.payload);
    } catch (e) {}
  }
};
