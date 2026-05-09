import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  ViewChildren,
  inject,
} from '@angular/core';

import {
  FormControl,
  FormControlName,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CustomValidators } from '@narik/custom-validators';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';

import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.html',
})
export class Cadastro extends FormBaseComponent implements AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly contaService = inject(ContaService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);

  errors: string[] = [];

  readonly senha = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, CustomValidators.rangeLength([6, 15])],
  });

  readonly senhaConfirm = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
      CustomValidators.equalTo(this.senha),
    ],
  });

  readonly cadastroForm = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),

    password: this.senha,

    confirmPassword: this.senhaConfirm,
  });

  usuario!: Usuario;

  constructor() {
    super();

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },

      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
      },

      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem',
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  override ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.cadastroForm);
  }

  adicionarConta(): void {
    if (!this.cadastroForm.dirty || !this.cadastroForm.valid) {
      return;
    }

    const usuario: Usuario = {
      id: '',
      ...this.cadastroForm.getRawValue(),
    };

    this.contaService
      .registrarUsuario(usuario)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => this.processarSucesso(response),

        error: (error) => this.processarFalha(error),
      });

    this.mudancasNaoSalvas = false;
  }

  private processarSucesso(response: Usuario): void {
    this.cadastroForm.reset();

    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    const toast = this.toastr.success('Registro realizado com Sucesso!', 'Bem vindo!!!');

    toast?.onHidden.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  private processarFalha(fail: any): void {
    this.errors = fail.error?.errors ?? [];

    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
