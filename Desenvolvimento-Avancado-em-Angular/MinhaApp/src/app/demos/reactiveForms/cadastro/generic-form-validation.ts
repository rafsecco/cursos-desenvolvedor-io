import { FormGroup, AbstractControl } from '@angular/forms';

export class GenericValidator<T extends Record<string, any>> {
  constructor(
    private validationMessages: {
      [K in keyof T]?: { [error: string]: string };
    },
  ) {}

  processarMensagens(container: FormGroup): { [K in keyof T]?: string } {
    const messages = {} as { [K in keyof T]?: string };

    Object.keys(container.controls).forEach((key) => {
      const control = container.controls[key] as AbstractControl;

      if (control instanceof FormGroup) {
        Object.assign(messages, this.processarMensagens(control));
        return;
      }

      const typedKey = key as keyof T;

      if (this.validationMessages[typedKey]) {
        messages[typedKey] = '';

        if ((control.dirty || control.touched) && control.errors) {
          Object.keys(control.errors).forEach((errorKey) => {
            const msg = this.validationMessages[typedKey]?.[errorKey];
            if (msg) {
              messages[typedKey]! += msg + '<br />';
            }
          });
        }
      }

      if (container.errors) {
        Object.keys(container.errors).forEach(errorKey => {
          if (errorKey === 'senhaConfirmacaoInvalida') {
            messages['senhaConfirmacao' as keyof T] =
              this.validationMessages['senhaConfirmacao']?.[errorKey] || '';
          }
        });
      }

    });

    return messages;
  }
}
