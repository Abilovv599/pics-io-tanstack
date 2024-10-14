import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/router/routes/route-tree.ts';

const router = createRouter({ routeTree });

export { router };
