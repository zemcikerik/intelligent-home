import { Role } from '../models';

export interface UserCreationDto {
  username: string;
  password: string;
  role: Role;
}
