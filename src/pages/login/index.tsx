import { LoginForm } from './components/login-form';

const LoginPage = () => {
  return (
    <div className="min-h-dvh flex justify-center items-center">
      <div className="min-w-96">
        <h1 className="mb-6 text-center text-xl">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export { LoginPage };
