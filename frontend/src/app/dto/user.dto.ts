import { Role } from '../models';

export interface UserDto {
  id: number;
  username: string;
  role: Role;
}
