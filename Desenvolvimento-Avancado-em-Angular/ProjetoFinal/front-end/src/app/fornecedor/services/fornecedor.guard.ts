import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivateFn } from '@angular/router';
import { BaseGuard } from '@services/base.guard';
import { NovoComponent } from '../novo/novo.component';

@Injectable({ providedIn: 'root' })
class FornecedorGuardService extends BaseGuard {
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

export const fornecedorCanActivate: CanActivateFn = (route) =>
  inject(FornecedorGuardService).canActivate(route);

export const fornecedorCanDeactivate: CanDeactivateFn<NovoComponent> = (component) =>
  inject(FornecedorGuardService).canDeactivate(component);
