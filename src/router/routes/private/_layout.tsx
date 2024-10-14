import { createRoute, Outlet, redirect } from '@tanstack/react-router';
import { rootRoute } from '@/router/routes';
import { BaseLayout } from '@/layout/base';
import { homeRoute } from '@/router/routes/private/home.ts';
import { commentRoute } from '@/router/routes/private/comment.ts';
import { commentsRoute } from '@/router/routes/private/comments.ts';
import { profileRoute } from '@/router/routes/private/profile.ts';
import { isAuthenticated } from '@/utils/auth.ts';

const baseLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'base-layout',
  component: () => (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  ),
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
});

baseLayoutRoute.addChildren([homeRoute, profileRoute, commentsRoute, commentRoute]);

export { baseLayoutRoute };
