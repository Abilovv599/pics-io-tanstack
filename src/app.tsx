import { ConfigProvider, App as AntdApp, FloatButton, theme } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useDarkMode } from 'usehooks-ts';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/router';
import { Suspense } from 'react';
import { TanStackRouterDevtools } from './router/devtools';

function App() {
  const { isDarkMode, toggle } = useDarkMode();
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
      <AntdApp className={`${isDarkMode ? 'bg-black' : null}`}>
        <RouterProvider router={router} />
        <Suspense>
          <TanStackRouterDevtools router={router} position="top-right" />
        </Suspense>
        <FloatButton icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />} onClick={toggle} />
      </AntdApp>
    </ConfigProvider>
  );
}

export { App };
