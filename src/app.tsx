import { ConfigProvider, App as AntdApp, FloatButton, theme } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useDarkMode } from 'usehooks-ts';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/router';

function App() {
  const { isDarkMode, toggle } = useDarkMode();
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
      <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
        <AntdApp className={`${isDarkMode ? 'bg-black' : null}`}>
          <RouterProvider router={router} />
          <FloatButton icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />} onClick={toggle} />
        </AntdApp>
      </ConfigProvider>
  );
}

export { App };
