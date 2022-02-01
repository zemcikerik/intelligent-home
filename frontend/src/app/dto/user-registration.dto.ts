import { Role } from '../models';

export interface UserRegistrationDto {
  username: string;
  password: string;
  role: Role;
}
