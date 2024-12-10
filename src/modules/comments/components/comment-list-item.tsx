import { Avatar, List, Typography } from 'antd';
import { HeartIcon } from '@/assets/icons/hearth/heart';
import { EditComment } from './comment-actions/edit-comment';
import { DeleteComment } from './comment-actions/delete-comment';
import type { IComment } from '@/modules/comments/models/comment';
import { Link } from 'react-router';

const commentActions = (id: number) => [<EditComment id={id} />, <DeleteComment id={id} />];

function CommentListItem({ comment }: { comment: IComment }) {
  return (
    <List.Item actions={commentActions(comment.id)}>
      <List.Item.Meta
        className="flex !items-center"
        avatar={
          <div className="flex items-center gap-2">
            <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${comment.id}`} />
            <Typography.Text>{comment.user.username}</Typography.Text>
          </div>
        }
        title={<Link to={`${comment.id}`}>{comment.body}</Link>}
      />
      <span className="flex items-center gap-1">
        <HeartIcon style={{ color: 'hotpink' }} />
        <Typography.Text>{comment.likes}</Typography.Text>
      </span>
    </List.Item>
  );
}

export { CommentListItem };
