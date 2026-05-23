import { Component, computed, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControlName
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { cpfValidator } from '../../../shared/validators/CPFValidator';
import { senhaConfirmacaoValidator } from '../../../shared/validators/senhaConfirmacaoValidator';

import { GenericValidator } from './generic-form-validation';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CadastroFormModel } from './models/CadastroFormModel';
import { CanExit } from '../../../services/unsavedChangesGuard';

type DisplayMessage = {
  [K in keyof CadastroFormModel]?: string;
};

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html'
})
export class Cadastro implements CanExit {

  hasChanges(): boolean {
    return this.cadastroForm.dirty;
  }

  private fb = inject(NonNullableFormBuilder);
  formResult = signal('');

  cadastroForm = this.fb.group(
    {
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: ['', [Validators.required, cpfValidator]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      senhaConfirmacao: ['', [Validators.required]]
    },
    { validators: senhaConfirmacaoValidator }
  );

  private validationMessages = {
    nome: {
      required: 'Nome é obrigatório',
      minlength: 'Mínimo 2 caracteres'
    },
    cpf: {
      required: 'CPF obrigatório',
      cpfInvalido: 'CPF inválido'
    },
    email: {
      required: 'Email obrigatório',
      email: 'Email inválido'
    },
    senha: {
      required: 'Senha obrigatória',
      minlength: 'Mínimo 6 caracteres'
    },
    senhaConfirmacao: {
      required: 'Confirmação obrigatória',
      senhaConfirmacaoInvalida: 'As senhas não conferem'
    }
  };

  private validator = new GenericValidator<CadastroFormModel>(this.validationMessages);

  // 🔥 transforma o valueChanges em signal
  private formChanges = toSignal(this.cadastroForm.valueChanges, {
    initialValue: this.cadastroForm.getRawValue()
  });

  // 🔥 aqui está a mágica
  // displayMessage = computed<DisplayMessage>(() => {
  //   this.formChanges(); // dependência reativa
  //   return this.validator.processarMensagens(this.cadastroForm);
  // });
  displayMessage = computed(() => {
    this.formValue();
    return this.validator.processarMensagens(this.cadastroForm);
  });

  // adicionarUsuario() {
  //   if (this.cadastroForm.valid) {
  //     console.log(this.cadastroForm.getRawValue());
  //   }
  // }

  adicionarUsuario() {
    if (this.cadastroForm.valid) {
      this.formResult.set(JSON.stringify(this.cadastroForm.getRawValue()));
    } else {
      this.formResult.set('Formulário inválido');
    }
  }

  // status (VALID / INVALID)
  formStatus = toSignal(this.cadastroForm.statusChanges, {
    initialValue: this.cadastroForm.status
  });

  // value changes (já tínhamos)
  formValue = toSignal(this.cadastroForm.valueChanges, {
    initialValue: this.cadastroForm.getRawValue()
  });

  // 🔥 derivados (aqui fica elegante)
  formValid = computed(() => this.formStatus() === 'VALID');
  formInvalid = computed(() => this.formStatus() === 'INVALID');

  //formDirty = computed(() => this.cadastroForm.dirty);
  formDirty = computed(() => {
    this.formValue(); // força reatividade
    return this.cadastroForm.dirty;
  });
  formTouched = computed(() => this.cadastroForm.touched);
}
