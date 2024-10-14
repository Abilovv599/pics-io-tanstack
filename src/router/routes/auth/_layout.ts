import { createRoute, Outlet, redirect } from '@tanstack/react-router';
import { rootRoute } from '@/router/routes';
import { isAuthenticated } from '@/utils/auth.ts';
import { loginRoute } from '@/router/routes/auth/login.ts';

const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth-layout',
  component: Outlet,
  beforeLoad: async ({ location }) => {
    if (isAuthenticated()) {
      throw redirect({
        to: '/',
        search: { redirect: location.href },
      });
    }
  },
});

authLayoutRoute.addChildren([loginRoute]);

export { authLayoutRoute };
