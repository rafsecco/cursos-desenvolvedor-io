import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageUtils {
  private readonly TOKEN_KEY = 'devio.token';
  private readonly USER_KEY = 'devio.user';

  obterUsuario<T>(): T | null {
    const user = localStorage.getItem(this.USER_KEY);

    return user ? (JSON.parse(user) as T) : null;
  }

  salvarDadosLocaisUsuario(response: LoginResponse): void {
    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response.userToken);
  }

  limparDadosLocaisUsuario(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  obterTokenUsuario(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  salvarTokenUsuario(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  salvarUsuario<T>(user: T): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

interface LoginResponse {
  accessToken: string;
  userToken: unknown;
}
