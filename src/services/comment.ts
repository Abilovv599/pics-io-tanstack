import { HttpClient } from '@/api/http-client';
import type { IComment, ICommentList } from '@/models/comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

// Fetch all comments
export const useGetCommentsQuery = () => {
  return useQuery<ICommentList>({
    queryKey: ['comments'],
    queryFn: async () => {
      const { data } = await HttpClient.getInstance().get<ICommentList>('/comments');
      return data;
    },
  });
};

// Fetch comment by ID
export const useGetCommentByIdQuery = (id: number) => {
  return useQuery<IComment>({
    queryKey: ['comment', id],
    queryFn: async () => {
      const { data } = await HttpClient.getInstance().get<IComment>(`/comments/${id}`);
      return data;
    },
    enabled: !!id, // only run query if id exists
  });
};

// Post a new comment
export const usePostCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IComment, AxiosError, { body: string; postId: number; userId: number }>({
    mutationFn: async (newComment) => {
      const { data } = await HttpClient.getInstance().post<IComment>('/comments/add', newComment);
      return data;
    },
    onSuccess: async () => {
      // Invalidate and re-fetch comments to show the newly added comment
      await queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

// Edit an existing comment
export const useEditCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IComment, AxiosError, Partial<IComment> & Pick<IComment, 'id'>>({
    mutationFn: async ({ id, ...patch }) => {
      const { data } = await HttpClient.getInstance().patch<IComment>(`/comments/${id}`, patch);
      return data;
    },
    onSuccess: async () => {
      // Invalidate and re-fetch the comments to show the updated comment
      await queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

// Delete a comment
export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IComment & { isDeleted: true; deletedOn: string }, AxiosError, number>({
    mutationFn: async (id) => {
      const { data } = await HttpClient.getInstance().delete<
        IComment & { isDeleted: true; deletedOn: string }
      >(`/comments/${id}`);
      return data;
    },
    onSuccess: async () => {
      // Invalidate and re-fetch comments after a successful delete
      await queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
