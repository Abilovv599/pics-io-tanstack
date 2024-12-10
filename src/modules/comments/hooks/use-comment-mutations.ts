import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IComment } from '@/modules/comments/models/comment';
import { CommentService } from '@/modules/comments/services/comment';
import type { AxiosError } from 'axios';

export function usePostCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation<IComment, AxiosError, { body: string; postId: number; userId: number }>({
    mutationFn: (newComment) => CommentService.getInstance().postComment(newComment),
    onSuccess: async () => {
      // Invalidate and re-fetch comments to show the newly added comment
      await queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}

export function useEditCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation<IComment, AxiosError, Partial<IComment> & Pick<IComment, 'id'>>({
    mutationFn: (patch) => CommentService.getInstance().editComment(patch),
    onSuccess: async () => {
      // Invalidate and re-fetch the comments to show the updated comment
      await queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation<IComment & { isDeleted: true; deletedOn: string }, AxiosError, number>({
    mutationFn: (id) => CommentService.getInstance().deleteComment(id),
    onSuccess: async () => {
      // Invalidate and re-fetch comments after a successful delete
      await queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}
