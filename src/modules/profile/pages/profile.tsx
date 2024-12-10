import { useGetUserQuery } from '@/modules/auth/hooks/use-auth-queries';

function ProfilePage() {
  const { data: user } = useGetUserQuery();
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
