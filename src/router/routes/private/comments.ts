import { createRoute } from '@tanstack/react-router';
import { CommentsPage } from '@/pages/comments';
import { baseLayoutRoute } from '@/router/routes/private/_layout.tsx';

const commentsRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: '/comments',
  component: CommentsPage,
});

export { commentsRoute };
