import { FormGroup } from '@angular/forms';

export class GenericValidator {
  constructor(private readonly validationMessages: ValidationMessages) {}

  processarMensagens(container: FormGroup): DisplayMessage {
    const messages: DisplayMessage = {};

    for (const [controlKey, control] of Object.entries(container.controls)) {
      if (control instanceof FormGroup) {
        Object.assign(messages, this.processarMensagens(control));

        continue;
      }

      if (!this.validationMessages[controlKey]) {
        continue;
      }

      messages[controlKey] = '';

      if ((control.dirty || control.touched) && control.errors) {
        for (const messageKey of Object.keys(control.errors)) {
          const mensagem = this.validationMessages[controlKey][messageKey];

          if (mensagem) {
            messages[controlKey] += `${mensagem}<br />`;
          }
        }
      }
    }

    return messages;
  }
}

export type DisplayMessage = Record<string, string>;

export type ValidationMessages = Record<string, Record<string, string>>;
