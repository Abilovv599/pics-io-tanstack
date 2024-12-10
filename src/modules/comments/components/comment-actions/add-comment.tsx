import { Button, Flex, Form, FormProps, Input, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { usePostCommentMutation } from '@/modules/comments/hooks/use-comment-mutations';
import { useGetUserQuery } from '@/modules/auth/hooks/use-auth-queries';

type FieldType = {
  comment: string;
};

function AddComment() {
  const { isPending, mutateAsync: post } = usePostCommentMutation();
  const { data: user } = useGetUserQuery();
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (!user?.id) {
      return;
    }

    try {
      await post({
        body: values.comment,
        postId: 2,
        userId: user.id,
      });

      form.resetFields();

      message.success('Comment added');
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };
  return (
    <Form form={form} name="add-comment" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Flex gap={10} className="max-w-[800px] mx-auto" align="center">
        <Form.Item name="comment" className="w-full mb-0">
          <Input.TextArea placeholder="Add comment..." variant="filled" />
        </Form.Item>
        <Button shape="circle" type="primary" htmlType="submit" disabled={isPending}>
          <SendOutlined />
        </Button>
      </Flex>
    </Form>
  );
}

export { AddComment };
