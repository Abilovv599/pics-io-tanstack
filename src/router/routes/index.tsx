import { createRootRoute, Outlet } from '@tanstack/react-router';

const rootRoute = createRootRoute({
  component: Outlet,
});

export { rootRoute };
