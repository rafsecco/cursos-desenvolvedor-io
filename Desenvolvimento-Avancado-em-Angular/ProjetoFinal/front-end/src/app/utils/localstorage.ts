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
    if (!this.isLocalStorageAvailable()) return null;

    const user = localStorage.getItem(this.USER_KEY);

    if (!user || user === 'undefined' || user === 'null') return null;

    try {
      return JSON.parse(user) as T;
    } catch {
      localStorage.removeItem(this.USER_KEY);
      return null;
    }
  }

  salvarDadosLocaisUsuario(response: LoginResponse): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    this.salvarTokenUsuario(response.data.accessToken);
    this.salvarUsuario(response.data.userToken);
  }

  limparDadosLocaisUsuario(): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  obterTokenUsuario(): string | null {
    if (!this.isLocalStorageAvailable()) return null;

    const token = localStorage.getItem(this.TOKEN_KEY);

    if (!token || token === 'undefined' || token === 'null') return null;

    return token;
  }

  salvarTokenUsuario(token: string): void {
    if (!this.isLocalStorageAvailable() || !token) return;

    localStorage.setItem(this.TOKEN_KEY, token);
  }

  salvarUsuario<T>(user: T): void {
    if (!this.isLocalStorageAvailable() || user == null) return;

    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

interface LoginResponse {
  data: {
    accessToken: string;
    userToken: unknown;
  };
}
