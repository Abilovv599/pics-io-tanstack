import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools position='top-right' />
    </>
  ),
});

export { rootRoute };
