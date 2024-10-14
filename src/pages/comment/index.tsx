import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from '@tanstack/react-router';
import { useGetCommentByIdQuery } from '@/services/comment';

function CommentPage() {
  const { id } = useParams({ strict: false });
  const {
    data: comment,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCommentByIdQuery(Number(id));

  if (isLoading) {
    return (
      <Flex align="center" justify="center" gap="middle">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </Flex>
    );
  }

  if (isError) {
    // error example { status: 'FETCH_ERROR'; error: 'TypeError: Failed to fetch' }
    return <div>{JSON.stringify(error)}</div>;
  }

  if (isSuccess) {
    return <div>{comment.body}</div>;
  }
}

export { CommentPage };
