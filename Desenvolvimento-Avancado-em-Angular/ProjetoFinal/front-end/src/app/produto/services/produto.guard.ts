import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivateFn } from '@angular/router';
import { BaseGuard } from '@services/base.guard';
import { NovoComponent } from '../novo/novo.component';

@Injectable({ providedIn: 'root' })
class ProdutoGuardService extends BaseGuard {
  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.validarClaims(route);
  }

  canDeactivate(component: NovoComponent): boolean {
    return (
      !component.mudancasNaoSalvas ||
      window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?')
    );
  }
}

export const produtoCanActivate: CanActivateFn = (route) =>
  inject(ProdutoGuardService).canActivate(route);

export const produtoCanDeactivate: CanDeactivateFn<NovoComponent> = (component) =>
  inject(ProdutoGuardService).canDeactivate(component);
