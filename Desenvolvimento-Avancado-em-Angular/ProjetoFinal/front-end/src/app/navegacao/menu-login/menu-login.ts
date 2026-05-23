import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthStateService } from '@services/auth-state.service';
import { LocalStorageUtils } from '@utils/localstorage';

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
  private readonly authState = inject(AuthStateService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly usuarioLogado = this.authState.logado;
  readonly email = this.authState.email;

  constructor() {
    effect(() => {
      this.authState.logado();
      this.cdr.markForCheck();
    });
  }

  logout(): void {
    this.localStorageUtils.limparDadosLocaisUsuario();
    this.authState.limpar();
    this.router.navigate(['/home']);
  }
}
