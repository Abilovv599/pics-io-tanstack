import { useAuth } from '@/modules/auth/hooks/use-auth';

function ProfilePage() {
  const { user } = useAuth();
  return (
    <div>
      {user
        ? Object.entries(user).map(([key, value]) => {
            return (
              <div key={key}>
                {key}:{JSON.stringify(value)}
              </div>
            );
          })
        : null}
    </div>
  );
}

export { ProfilePage };
