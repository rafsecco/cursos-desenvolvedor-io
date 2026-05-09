import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageUtils } from '../../utils/localstorage';

@Component({
  selector: 'app-menu-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuLogin {
  private readonly router = inject(Router);
  private readonly localStorageUtils = inject(LocalStorageUtils);

  readonly token = signal<string | null>(this.localStorageUtils.obterTokenUsuario());

  readonly usuario = signal<UsuarioToken | null>(this.localStorageUtils.obterUsuario());

  readonly usuarioLogado = computed(() => !!this.token());

  readonly email = computed(() => this.usuario()?.email ?? '');

  logout(): void {
    this.localStorageUtils.limparDadosLocaisUsuario();

    this.token.set(null);
    this.usuario.set(null);

    this.router.navigate(['/home']);
  }
}

interface UsuarioToken {
  email: string;
}
