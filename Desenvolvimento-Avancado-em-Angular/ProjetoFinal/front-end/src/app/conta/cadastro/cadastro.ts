import { AfterViewInit, Component, ElementRef, ViewChildren, inject } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { ContaService } from '../services/conta.service';
import { CustomFormValidators } from '@utils/custom-form-validators';
import { FormBaseComponent } from '@app/base-components/form-base.component';
import { LoginResponse } from '../models/login-response';
import { RegistroUsuario } from '../models/registro-usuario';

interface CadastroForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.html',
  imports: [ReactiveFormsModule],
})
export class Cadastro extends FormBaseComponent implements AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })

  protected readonly formInputElements!: ElementRef[];
  protected errors: string[] = [];
  protected readonly fb = inject(NonNullableFormBuilder);
  private readonly contaService = inject(ContaService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  cadastroForm!: FormGroup<CadastroForm>;

  override validationMessages = {
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

  constructor() {
    super();
    this.configurarMensagensValidacaoBase(this.validationMessages);
    this.criarFormulario();
  }

  private criarFormulario(): void {
    const senha = this.fb.control('', [
      Validators.required,
      CustomFormValidators.rangeLength([6, 15]),
    ]);

    const senhaConfirm = this.fb.control('', [
      Validators.required,
      CustomFormValidators.rangeLength([6, 15]),
      CustomFormValidators.matchValues(() => senha),
    ]);

    this.cadastroForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: senha,
      confirmPassword: senhaConfirm,
    });
  }

  ngAfterViewInit(): void {
    this.configurarValidacaoFormularioBase(this.formInputElements, this.cadastroForm);
  }

  adicionarConta(): void {
    if (this.cadastroForm.invalid) {
      return;
    }

    if (!this.cadastroForm.dirty) {
      return;
    }

    const usuario: RegistroUsuario = this.cadastroForm.getRawValue();

    this.contaService
      .registrarUsuario(usuario)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (response) => this.processarSucesso(response),
        error: (error) => this.processarFalha(error),
      });

    this.mudancasNaoSalvas = false;
  }

  private processarSucesso(response: LoginResponse): void {
    this.cadastroForm.reset();
    this.errors = [];

    //this.contaService.localStorageUtils.salvarDadosLocaisUsuario(response);
    this.contaService.salvarResponseUsuario(response);

    const toast = this.toastr.success('Registro realizado com sucesso!', 'Bem-vindo!');

    toast?.onHidden.pipe(takeUntilDestroyed()).subscribe(() => {
      this.router.navigate(['/home']);
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
