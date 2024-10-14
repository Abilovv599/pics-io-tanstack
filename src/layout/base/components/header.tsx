import { Breadcrumb, Layout, theme } from 'antd';
import { Link, useLocation } from '@tanstack/react-router';

function Header() {
  const { token } = theme.useToken();

  const location = useLocation();

  const items = [
    {
      title: <Link to="/">{location.pathname}</Link>,
    },
  ];

  return (
    <Layout.Header
      style={{ background: token.colorBgContainer }}
      className="flex items-center sticky top-0 z-10"
    >
      <Breadcrumb items={items} />
    </Layout.Header>
  );
}

export { Header };
