import { FloatButton } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

export function ThemeSwitcher({ isDarkMode, toggle }: { isDarkMode: boolean; toggle: () => void }) {
  return <FloatButton icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />} onClick={toggle} />;
}
