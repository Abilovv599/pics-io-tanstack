import { Layout, theme } from 'antd';
import { Header } from './header';
import { Footer } from './footer';

interface IContentProps {
  children: React.ReactNode;
}

function Content({ children }: IContentProps) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout.Content className="min-h-svh relative">
      <Header />
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
        className="text-center p-6 m-4"
      >
        {children}
      </div>
      <Footer />
    </Layout.Content>
  );
}

export { Content };
