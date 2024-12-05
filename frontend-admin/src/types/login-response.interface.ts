import { IUser } from './user.interface';

export interface LoginResponse {
  user: IUser;
  token: string;
}
