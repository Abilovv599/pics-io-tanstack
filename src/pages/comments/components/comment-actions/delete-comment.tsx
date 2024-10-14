import { DeleteOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, PopconfirmProps } from 'antd';
import { useDeleteCommentMutation } from '@/services/comment';

interface IDeleteCommentProps {
  id: number;
}

function DeleteComment({ id }: IDeleteCommentProps) {
  const { isPending, mutateAsync: deleteComment } = useDeleteCommentMutation();

  const confirm: PopconfirmProps['onConfirm'] = async () => {
    try {
      await deleteComment(id);
      message.success(`Comment with id: ${id} deleted`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Popconfirm
      title="Delete the comment"
      description="Are you sure to delete this comment?"
      onConfirm={confirm}
      okText="Yes"
      cancelText="No"
    >
      <Button shape="round" danger type="primary" size="small" loading={isPending}>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
}

export { DeleteComment };
