import { useAuth } from '@/hooks/useAuth';

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
