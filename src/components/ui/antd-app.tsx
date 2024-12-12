import { App, ConfigProvider, theme } from 'antd';
import { ThemeSwitcher } from '../shared/theme-switcher';
import type { ReactNode } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';

export function AntdApp({ children }: { children: ReactNode }) {
  const { isDarkMode, toggle } = useDarkMode({ localStorageKey: 'dark-mode' });

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
