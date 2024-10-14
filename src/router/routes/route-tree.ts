import { rootRoute } from '@/router/routes/index.tsx';
import { notFoundRoute } from '@/router/routes/static/not-found.ts';
import { baseLayoutRoute } from '@/router/routes/private/_layout.tsx';
import { authLayoutRoute } from '@/router/routes/auth/_layout.ts';

const routeTree = rootRoute.addChildren([baseLayoutRoute, authLayoutRoute, notFoundRoute]);

export { routeTree };
