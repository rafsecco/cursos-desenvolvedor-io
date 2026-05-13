import { DestroyRef, ElementRef, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent, merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  DisplayMessage,
  GenericValidator,
  ValidationMessages,
} from '../utils/generic-form-validation';

export abstract class FormBaseComponent {
  protected readonly destroyRef = inject(DestroyRef);

  protected displayMessage: DisplayMessage = {};

  protected genericValidator!: GenericValidator;

  protected validationMessages!: ValidationMessages;

  protected mudancasNaoSalvas = false;

  protected configurarMensagensValidacaoBase(validationMessages: ValidationMessages): void {
    this.validationMessages = validationMessages;

    this.genericValidator = new GenericValidator(validationMessages);
  }

  protected configurarValidacaoFormularioBase(
    formInputElements: ElementRef[],
    formGroup: FormGroup,
  ): void {
    const controlBlurs = formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur'),
    );

    merge(...controlBlurs)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.validarFormulario(formGroup);
      });
  }

  protected validarFormulario(formGroup: FormGroup): void {
    this.displayMessage = this.genericValidator.processarMensagens(formGroup);

    this.mudancasNaoSalvas = true;
  }
}
