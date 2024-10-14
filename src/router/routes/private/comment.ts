import { createRoute } from '@tanstack/react-router';
import { CommentPage } from '@/pages/comment';
import { baseLayoutRoute } from '@/router/routes/private/_layout.tsx';

const commentRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: '/comments/$id',
  component: CommentPage,
});

export { commentRoute };
