import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export const senhaConfirmacaoValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const senha = group.get('senha')?.value;
  const senhaConfirmacao = group.get('senhaConfirmacao')?.value;

  if (senha && senhaConfirmacao && senha !== senhaConfirmacao) {
    return { senhaConfirmacaoInvalida: true };
  }

  return null;
};
