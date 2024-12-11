import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { queryClient } from './lib/query-client';
import { AntdApp } from '@/components/ui/antd-app';
import { AppRouter } from '@/router/router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <BrowserRouter>
      <AntdApp>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AntdApp>
    </BrowserRouter>
  );
}

export { App };
