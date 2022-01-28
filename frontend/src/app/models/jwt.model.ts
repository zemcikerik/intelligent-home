export enum Authority {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}

export interface Jwt {
  username: string;
  expiresOn: number;
  issuedBy: string;
  authorities: Authority[];
  rawToken: string;
}
