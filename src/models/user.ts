interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

interface ILoginResponse extends IUser {
  accessToken: string; // JWT accessToken (for backward compatibility) in response and cookies
  refreshToken: string; // refreshToken in response and cookies
}

interface ILoginRequest {
  username: string;
  password: string;
  expiresInMins?: number; // optional, defaults to 60
}

export type { IUser, ILoginResponse, ILoginRequest };
