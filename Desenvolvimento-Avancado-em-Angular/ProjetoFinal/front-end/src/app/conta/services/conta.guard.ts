import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { Cadastro } from '../cadastro/cadastro';
import { LocalStorageUtils } from '@utils/localstorage';

export const cadastroGuard: CanDeactivateFn<Cadastro> = (component) => {
  if (component.mudancasNaoSalvas) {
    return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
  }

  return true;
};

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);

  const localStorageUtils = new LocalStorageUtils();

  if (localStorageUtils.obterTokenUsuario()) {
    router.navigate(['/home']);
  }

  return true;
};
