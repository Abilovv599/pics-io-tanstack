import { AppRouter } from '@/router/router';
import { AntdApp } from '@/components/ui/antd-app';

function App() {
  return (
    <AntdApp>
      <AppRouter />
    </AntdApp>
  );
}

export { App };
