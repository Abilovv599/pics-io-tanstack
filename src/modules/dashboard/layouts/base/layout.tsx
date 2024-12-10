import { Layout, Spin } from 'antd';
import { Sidebar } from '@/modules/dashboard/layouts/base/components/sidebar';
import { Content } from '@/modules/dashboard/layouts/base/components/content';
import { useGetUserQuery } from '@/modules/auth/hooks/use-auth-queries';
import { LoadingOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router';

function BaseLayout() {
  const { isLoading } = useGetUserQuery();

  if (isLoading) {
    return (
      <div className="min-h-dvh flex justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  return (
    <Layout hasSider>
      <Layout className="ms-[200px]">
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export { BaseLayout };
