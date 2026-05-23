import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from '@app/base-components/form-base.component';
import { StringUtils } from '@utils/string-utils';
import { CepConsulta } from '../models/endereco';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
})
export class NovoComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  private readonly fb = inject(FormBuilder);
  private readonly fornecedorService = inject(FornecedorService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  readonly errors = signal<string[]>([]);
  readonly textoDocumento = signal('CPF (requerido)');
  readonly formResult = signal('');

  fornecedorForm!: FormGroup;
  fornecedor = {} as Fornecedor;

  constructor() {
    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido',
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido',
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.fornecedorForm = this.fb.group({
      nome: ['', Validators.required],
      documento: ['', Validators.required],
      ativo: [true, Validators.required],
      tipoFornecedor: ['1', Validators.required],

      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        cep: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
      }),
    });
  }

  ngAfterViewInit(): void {
    this.tipoFornecedorForm()
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.trocarValidacaoDocumento();

        super.configurarValidacaoFormularioBase(this.formInputElements, this.fornecedorForm);

        super.validarFormulario(this.fornecedorForm);
      });

    super.configurarValidacaoFormularioBase(this.formInputElements, this.fornecedorForm);
  }

  trocarValidacaoDocumento(): void {
    const documentoControl = this.documento();

    documentoControl.clearValidators();
    documentoControl.setValidators([Validators.required]);
    this.textoDocumento.set(
      this.tipoFornecedorForm().value === '1' ? 'CPF (requerido)' : 'CNPJ (requerido)',
    );
    documentoControl.setValue('', { emitEvent: false });
    documentoControl.updateValueAndValidity();
  }

  mascaraDocumento(value: string): void {
    const tipo = Number(this.tipoFornecedorForm().value);
    const masked = StringUtils.formatarDocumento(value, tipo);
    this.documento().setValue(masked, { emitEvent: false });
  }

  mascaraCep(value: string): void {
    const masked = StringUtils.formatarCEP(StringUtils.somenteNumeros(value));
    this.fornecedorForm.get('endereco.cep')?.setValue(masked, { emitEvent: false });
  }

  tipoFornecedorForm(): AbstractControl {
    return this.fornecedorForm.get('tipoFornecedor')!;
  }

  documento(): AbstractControl {
    return this.fornecedorForm.get('documento')!;
  }

  buscarCep(cep: string): void {
    const cepFormatado = StringUtils.somenteNumeros(cep);

    if (cepFormatado.length < 8) return;

    this.fornecedorService
      .consultarCep(cepFormatado)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (cepRetorno) => this.preencherEnderecoConsulta(cepRetorno),
        error: (falha: { error: { errors: string[] } }) => {
          this.errors.update((e) => [...e, ...falha.error.errors]);
        },
      });
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta): void {
    this.fornecedorForm.patchValue({
      endereco: {
        logradouro: cepConsulta.logradouro,
        bairro: cepConsulta.bairro,
        cep: cepConsulta.cep,
        cidade: cepConsulta.localidade,
        estado: cepConsulta.uf,
      },
    });
  }

  adicionarFornecedor(): void {
    if (!this.fornecedorForm.dirty || !this.fornecedorForm.valid) return;

    const form = this.fornecedorForm.getRawValue();

    this.fornecedor = {
      ...this.fornecedor,
      nome: form.nome,
      documento: StringUtils.somenteNumeros(form.documento),
      ativo: form.ativo,
      tipoFornecedor: parseInt(form.tipoFornecedor, 10),
      endereco: {
        ...this.fornecedor.endereco,
        logradouro: form.endereco.logradouro,
        numero: form.endereco.numero,
        complemento: form.endereco.complemento,
        bairro: form.endereco.bairro,
        cep: StringUtils.somenteNumeros(form.endereco.cep),
        cidade: form.endereco.cidade,
        estado: form.endereco.estado,
      },
    };

    this.formResult.set(JSON.stringify(this.fornecedor));

    this.fornecedorService
      .novoFornecedor(this.fornecedor)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (sucesso) => this.processarSucesso(sucesso),
        error: (falha) => this.processarFalha(falha),
      });
  }

  processarSucesso(_: unknown): void {
    this.fornecedorForm.reset();
    this.errors.set([]);
    this.mudancasNaoSalvas = false;

    const toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    toast?.onHidden.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.router.navigate(['/fornecedores/listar-todos']);
    });
  }

  processarFalha(fail: { error: { errors: string[] } }): void {
    this.errors.set(fail.error.errors);
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
