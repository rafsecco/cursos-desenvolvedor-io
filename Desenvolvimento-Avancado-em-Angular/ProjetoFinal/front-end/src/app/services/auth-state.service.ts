import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginResponse, UserToken } from '@app/conta/models/login-response';
import { LocalStorageUtils } from '@utils/localstorage';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly localStorageUtils = inject(LocalStorageUtils);

  readonly token = signal<string | null>(this.localStorageUtils.obterTokenUsuario());
  readonly usuario = signal<UserToken | null>(
    this.localStorageUtils.obterUsuario<UserToken>(),
  );

  readonly logado = computed(() => !!this.token());
  readonly email = computed(() => this.usuario()?.email ?? '');

  atualizar(response: LoginResponse): void {
    this.token.set(response.data.accessToken);
    this.usuario.set(response.data.userToken);
  }

  limpar(): void {
    this.token.set(null);
    this.usuario.set(null);
  }
}
