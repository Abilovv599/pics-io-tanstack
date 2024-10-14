import { Button, Result } from 'antd';
import { Link } from '@tanstack/react-router';

function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
}

export { NotFound };
