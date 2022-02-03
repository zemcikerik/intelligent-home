import { Role } from '../models';

export interface UserCreateDto {
  username: string;
  password: string;
  role: Role;
}
