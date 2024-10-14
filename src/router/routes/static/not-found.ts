import { createRoute } from '@tanstack/react-router';
import { NotFound } from '@/pages/not-found';
import { rootRoute } from '@/router/routes';

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});

export { notFoundRoute };
