import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageUtils {
  private readonly TOKEN_KEY = 'devio.token';
  private readonly USER_KEY = 'devio.user';

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  obterUsuario<T>(): T | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }

    const user = localStorage.getItem(this.USER_KEY);

    return user ? (JSON.parse(user) as T) : null;
  }

  salvarDadosLocaisUsuario(response: LoginResponse): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response.userToken);
  }

  limparDadosLocaisUsuario(): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  obterTokenUsuario(): string | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }

    return localStorage.getItem(this.TOKEN_KEY);
  }

  salvarTokenUsuario(token: string): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    localStorage.setItem(this.TOKEN_KEY, token);
  }

  salvarUsuario<T>(user: T): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

interface LoginResponse {
  accessToken: string;
  userToken: unknown;
}
