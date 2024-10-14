import { createRoute } from '@tanstack/react-router';
import { baseLayoutRoute } from '@/router/routes/private/_layout.tsx';
import { ProfilePage } from '@/pages/profile';

const profileRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: 'profile',
  component: ProfilePage,
});

export { profileRoute };
