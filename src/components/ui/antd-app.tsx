import { App, ConfigProvider, theme } from 'antd';
import { ThemeSwitcher } from '../shared/theme-switcher';
import { useDarkMode } from 'usehooks-ts';
import type { ReactNode } from 'react';

export function AntdApp({ children }: { children: ReactNode }) {
  const { isDarkMode, toggle } = useDarkMode();

  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
      <App className={`${isDarkMode ? 'bg-black' : null}`}>
        {children}
        <ThemeSwitcher isDarkMode={isDarkMode} toggle={toggle} />
      </App>
    </ConfigProvider>
  );
}
