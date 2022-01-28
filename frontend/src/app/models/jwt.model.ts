export enum Authorities {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}

export interface Jwt {
  username: string;
  expiresOn: number;
  issuedBy: string;
  authorities: Authorities[];
  rawToken: string;
}
