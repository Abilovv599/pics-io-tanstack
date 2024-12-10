import type { MenuProps } from 'antd';
import { BarChartOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, Typography } from 'antd';
import { createElement } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { useGetUserQuery } from '@/modules/auth/hooks/use-auth-queries';

const items: MenuProps['items'] = [
  {
    key: 0,
    icon: createElement(UserOutlined),
    label: <Link to="/">Home</Link>,
  },
  {
    key: 1,
    icon: createElement(BarChartOutlined),
    label: <Link to="/comments">Comments</Link>,
  },
];

const siderStyle: CSSProperties = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
};

function Sidebar() {
  const { data: user } = useGetUserQuery();
  const { logout } = useAuth();
  return (
    <Layout.Sider
      trigger={null}
      style={siderStyle}
      className="overflow-auto h-screen fixed start-0 inset-y-0"
    >
      <div className="flex flex-col justify-between h-full py-2">
        <div>
          <Link className="p-2 flex gap-3 items-center mx-1 bg-white rounded-lg" to="/profile">
            <Avatar icon={<UserOutlined />} src={user?.image} className="ml-2" />
            <Typography.Text className="text-black">{user?.username}</Typography.Text>
          </Link>
          <Menu theme="dark" mode="inline" items={items} />
        </div>
        <div className="flex justify-center">
          <button className="bg-white py-1 px-2 rounded" onClick={logout}>
            <LogoutOutlined className="text-black" />
          </button>
        </div>
      </div>
    </Layout.Sider>
  );
}

export { Sidebar };
