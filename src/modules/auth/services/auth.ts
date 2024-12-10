import { ILoginRequest, ILoginResponse, IUser } from '@/models/user';
import { HttpClient, type HttpBodyOrParams } from '@/lib/http-client';

interface IAuthService {
  login(credentials: HttpBodyOrParams<ILoginRequest>): Promise<ILoginResponse>;
  getUser(): Promise<IUser>;
}

export class AuthService implements IAuthService {
  private static instance: AuthService;
  private readonly basePath = 'auth';
  private constructor(private readonly httpClient: HttpClient) {}

  public static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(HttpClient.getInstance());
    }
    return AuthService.instance;
  }

  public async getUser() {
    return await this.httpClient.get<IUser>(`${this.basePath}/me`);
  }

  public async login(credentials: HttpBodyOrParams<ILoginRequest>) {
    return await this.httpClient.post<ILoginResponse>(`${this.basePath}/login`, credentials);
  }
}
