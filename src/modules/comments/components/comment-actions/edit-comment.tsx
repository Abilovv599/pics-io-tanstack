import { useState } from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal } from 'antd';

import { useEditCommentMutation } from '@/modules/comments/hooks/use-comment-mutations';

interface IEditCommentProps {
  id: number;
}

function EditComment({ id }: IEditCommentProps) {
  const [open, setOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  const { isPending, mutateAsync: edit } = useEditCommentMutation();

  const handleOk = async () => {
    if (!commentText.trim()) {
      return;
    }

    try {
      await edit({
        id,
        body: commentText,
      });
      message.success(`Comment with id: ${id} edited`);
      setCommentText('');
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button shape="round" size="small" type="primary" onClick={showModal}>
        <EditOutlined />
      </Button>
      <Modal
        title="Edit comment"
        open={open}
        onOk={handleOk}
        confirmLoading={isPending}
        onCancel={handleCancel}
      >
        <Input
          type="text"
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Please enter new comment message..."
        />
      </Modal>
    </>
  );
}

export { EditComment };
