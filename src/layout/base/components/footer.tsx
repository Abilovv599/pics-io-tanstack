import { Layout } from 'antd';

function Footer() {
  return (
    <Layout.Footer className="text-center mt-auto">
      App ©{new Date().getFullYear()} Created by Jeyhun Abilov
    </Layout.Footer>
  );
}

export { Footer };
