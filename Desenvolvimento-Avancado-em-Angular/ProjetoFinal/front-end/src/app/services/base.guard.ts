import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { inject } from '@angular/core';

import { LocalStorageUtils } from '@utils/localstorage';
import { Claim } from '@app/conta/models/claim';
import { UsuarioToken } from '@app/conta/models/usuario-token';

export abstract class BaseGuard {
  protected readonly router = inject(Router);

  private readonly localStorageUtils = new LocalStorageUtils();

  protected validarClaims(routeAc: ActivatedRouteSnapshot): boolean {
    if (!this.localStorageUtils.obterTokenUsuario()) {
      this.router.navigate(['/conta/login'], {
        queryParams: {
          returnUrl: this.router.url,
        },
      });

      return false;
    }

    const user = this.localStorageUtils.obterUsuario<UsuarioToken>();

    const routeClaim = routeAc.data['claim'];

    if (!routeClaim) {
      return true;
    }

    if (!user?.claims) {
      this.navegarAcessoNegado();

      return false;
    }

    const userClaim = user.claims.find((x: Claim) => x.type === routeClaim.nome);

    if (!userClaim) {
      this.navegarAcessoNegado();

      return false;
    }

    const valoresClaim = userClaim.value as string;

    if (!valoresClaim.includes(routeClaim.valor)) {
      this.navegarAcessoNegado();

      return false;
    }

    return true;
  }

  private navegarAcessoNegado(): void {
    this.router.navigate(['/acesso-negado']);
  }
}
