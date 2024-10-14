import { createRoute } from '@tanstack/react-router';
import { HomePage } from '@/pages/home';
import { baseLayoutRoute } from '@/router/routes/private/_layout.tsx';

const homeRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: '/',
  component: HomePage,
});

export { homeRoute };
