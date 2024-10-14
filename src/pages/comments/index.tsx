import { AddComment } from './components/comment-actions/add-comment';
import { CommentList } from './components/comment-list';

function CommentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <CommentList />
      <AddComment />
    </div>
  );
}

export { CommentsPage };
