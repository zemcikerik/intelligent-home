import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';

@Injectable()
export class TokenStorageService {

  eraseToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

}
