import { Layout, Spin } from 'antd';
import { Sidebar } from '@/layout/base/components/sidebar';
import { Content } from '@/layout/base/components/content';
import { useGetMeQuery } from '@/services/auth';
import { LoadingOutlined } from '@ant-design/icons';

interface IBaseLayout {
  children: React.ReactNode;
}

function BaseLayout({ children }: IBaseLayout) {
  const { isLoading } = useGetMeQuery();

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
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}

export { BaseLayout };
