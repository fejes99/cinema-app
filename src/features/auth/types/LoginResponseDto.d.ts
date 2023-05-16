import { User } from './User';

export interface LoginResponseDto {
  token: string;
  user: User;
}
