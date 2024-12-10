import { ConfigProvider, App as AntdApp, FloatButton, theme } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useDarkMode } from 'usehooks-ts';
import { AppRouter } from '@/app/router';

function App() {
  const { isDarkMode, toggle } = useDarkMode();
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
      <AntdApp className={`${isDarkMode ? 'bg-black' : null}`}>
        <AppRouter />
        <FloatButton icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />} onClick={toggle} />
      </AntdApp>
    </ConfigProvider>
  );
}

export { App };
