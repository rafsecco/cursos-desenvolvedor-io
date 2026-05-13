import { AfterViewInit, Component, ElementRef, ViewChildren, inject } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';

import { LoginUsuario } from '../models/login-usuario';
import { ContaService } from '../services/conta.service';
import { FormBaseComponent } from '@app/base-components/form-base.component';
import { CustomFormValidators } from '@utils/custom-form-validators';
import { LoginResponse } from '../models/login-response';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login extends FormBaseComponent implements AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  protected readonly formInputElements!: ElementRef[];

  protected readonly fb = inject(NonNullableFormBuilder);
  private readonly contaService = inject(ContaService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);

  protected errors: string[] = [];

  protected readonly returnUrl = this.route.snapshot.queryParams['returnUrl'];

  protected readonly loginForm: FormGroup<LoginForm> = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),

    password: this.fb.control('', [Validators.required, CustomFormValidators.rangeLength([6, 15])]),
  });

  override validationMessages = {
    email: {
      required: 'Informe o e-mail',
      email: 'Email inválido',
    },

    password: {
      required: 'Informe a senha',
      rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
    },
  };

  constructor() {
    super();

    this.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngAfterViewInit(): void {
    this.configurarValidacaoFormularioBase(this.formInputElements, this.loginForm);
  }

  protected login(): void {
    if (this.loginForm.invalid || !this.loginForm.dirty) {
      return;
    }

    const usuario: LoginUsuario = this.loginForm.getRawValue();

    this.contaService
      .login(usuario)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (response) => this.processarSucesso(response),

        error: (error) => this.processarFalha(error),
      });
  }

  private processarSucesso(response: LoginResponse): void {
    this.loginForm.reset();

    this.errors = [];

    this.contaService.salvarResponseUsuario(response);

    const toast = this.toastr.success('Login realizado com sucesso!', 'Bem-vindo!');

    toast?.onHidden.pipe(takeUntilDestroyed()).subscribe(() => {
      this.router.navigate([this.returnUrl || '/home']);
    });
  }

  private processarFalha(error: {
    error?: {
      errors?: string[];
    };
  }): void {
    this.errors = error.error?.errors ?? [];

    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
