import { useQuery } from '@tanstack/react-query';
import type { IComment, ICommentList } from '@/modules/comments/models/comment';
import { CommentService } from '@/modules/comments/services/comment';

export function useGetCommentsQuery() {
  return useQuery<ICommentList>({
    queryKey: ['comments'],
    queryFn: () => CommentService.getInstance().getComments(),
  });
}

export function useGetCommentByIdQuery(id: number) {
  return useQuery<IComment>({
    queryKey: ['comment', id],
    queryFn: () => CommentService.getInstance().getCommentById(id),
    enabled: !!id, // only run query if id exists
  });
}
