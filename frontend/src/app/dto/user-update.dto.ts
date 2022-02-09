import { Role } from '../models';

export interface UserUpdateDto {
  password?: string;
  role?: Role;
}
