interface IUser {
  id: number;
  username: string;
  fullName: string;
}

interface IComment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: IUser;
}

interface ICommentList {
  comments: IComment[];
}

export type { IComment, ICommentList };
