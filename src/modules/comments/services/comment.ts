import { HttpClient } from '@/lib/http-client';
import type { IComment, ICommentList } from '@/modules/comments/models/comment';
import type { HttpBodyOrParams } from '@/lib/http-client';

interface ICommentService {
  getComments(): Promise<ICommentList>;
  getCommentById(id: number): Promise<IComment>;
  postComment(newComment: { body: string; postId: number; userId: number }): Promise<IComment>;
  editComment(credentials: HttpBodyOrParams<Partial<IComment> & Pick<IComment, 'id'>>): Promise<IComment>;
  deleteComment(id: number): Promise<IComment & { isDeleted: true; deletedOn: string }>;
}

export class CommentService implements ICommentService {
  private static instance: CommentService;
  private readonly basePath = 'comments';
  private constructor(private readonly httpClient: HttpClient) {}

  public static getInstance(): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService(HttpClient.getInstance());
    }
    return CommentService.instance;
  }

  public async getComments() {
    return await this.httpClient.get<ICommentList>(`/${this.basePath}`);
  }

  public async getCommentById(id: number) {
    return await this.httpClient.get<IComment>(`/${this.basePath}/${id}`);
  }

  public async postComment(newComment: { body: string; postId: number; userId: number }) {
    return await this.httpClient.post<IComment>(`/${this.basePath}/add`, newComment);
  }

  public async editComment({ id, ...patch }: HttpBodyOrParams<Partial<IComment> & Pick<IComment, 'id'>>) {
    return await this.httpClient.patch<IComment>(`/${this.basePath}/${id}`, patch);
  }

  public async deleteComment(id: number) {
    return await HttpClient.getInstance().delete<IComment & { isDeleted: true; deletedOn: string }>(
      `/${this.basePath}/${id}`,
    );
  }
}
