import { List, Skeleton } from 'antd';
import { CommentListItem } from './comment-list-item';
import { useGetCommentsQuery } from '@/modules/comments/hooks/use-comment-queries';

function CommentList() {
  const { data, isLoading, isSuccess, isError, error } = useGetCommentsQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <Skeleton active avatar paragraph={{ rows: 0 }} title={{ width: '100%' }} />
        <Skeleton active avatar paragraph={{ rows: 0 }} title={{ width: '100%' }} />
        <Skeleton active avatar paragraph={{ rows: 0 }} title={{ width: '100%' }} />
        <Skeleton active avatar paragraph={{ rows: 0 }} title={{ width: '100%' }} />
        <Skeleton active avatar paragraph={{ rows: 0 }} title={{ width: '100%' }} />
        <Skeleton active avatar paragraph={{ rows: 0 }} title={{ width: '100%' }} />
      </div>
    );
  }

  if (isError) {
    // error example { status: 'FETCH_ERROR'; error: 'TypeError: Failed to fetch' }
    return <div>{JSON.stringify(error)}</div>;
  }

  if (isSuccess) {
    return (
      <div className="overflow-scroll h-[550px]">
        <List
          itemLayout="horizontal"
          dataSource={data.comments}
          renderItem={(item) => <CommentListItem comment={item} />}
        />
      </div>
    );
  }
}

export { CommentList };
