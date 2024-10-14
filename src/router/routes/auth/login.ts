import { createRoute } from '@tanstack/react-router';
import { LoginPage } from '@/pages/login';
import { authLayoutRoute } from '@/router/routes/auth/_layout.ts';

const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/login',
  component: LoginPage,
});

export { loginRoute };
