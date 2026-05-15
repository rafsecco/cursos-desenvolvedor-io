import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  TemplateRef,
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from '@app/base-components/form-base.component';
import { StringUtils } from '@utils/string-utils';
import { CepConsulta, Endereco } from '../models/endereco';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';
import { ListaProdutosComponent } from '../produtos/lista-produtos.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  imports: [NgClass, ReactiveFormsModule, RouterModule, NgxSpinnerModule, ListaProdutosComponent],
})
export class EditarComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  private readonly fb = inject(FormBuilder);
  private readonly fornecedorService = inject(FornecedorService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly route = inject(ActivatedRoute);
  private readonly modalService = inject(NgbModal);
  private readonly spinner = inject(NgxSpinnerService);
  protected override readonly destroyRef = inject(DestroyRef);

  readonly errors = signal<string[]>([]);
  readonly errorsEndereco = signal<string[]>([]);

  fornecedorForm!: FormGroup;
  enderecoForm!: FormGroup;
  fornecedor = this.route.snapshot.data['fornecedor'] as Fornecedor;
  endereco = {} as Endereco;
  textoDocumento = '';
  readonly tipoFornecedor = this.fornecedor.tipoFornecedor;

  constructor() {
    super();
    const config = inject(NgbModalConfig);
    config.backdrop = 'static';
    config.keyboard = false;

    this.validationMessages = {
      /* ... sem alteração ... */
    };
    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.spinner.show();

    this.fornecedorForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      documento: ['', Validators.required],
      ativo: [false, Validators.required],
      tipoFornecedor: ['', Validators.required],
    });

    this.enderecoForm = this.fb.group({
      id: [''],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      fornecedorId: [''],
    });

    this.preencherForm();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  preencherForm(): void {
    this.fornecedorForm.patchValue({
      id: this.fornecedor.id,
      nome: this.fornecedor.nome,
      ativo: this.fornecedor.ativo,
      tipoFornecedor: this.fornecedor.tipoFornecedor.toString(),
      documento: StringUtils.formatarDocumento(
        this.fornecedor.documento,
        this.fornecedor.tipoFornecedor,
      ),
    });

    this.documento().setValidators([Validators.required]);

    this.enderecoForm.patchValue({
      id: this.fornecedor.endereco.id,
      logradouro: this.fornecedor.endereco.logradouro,
      numero: this.fornecedor.endereco.numero,
      complemento: this.fornecedor.endereco.complemento,
      bairro: this.fornecedor.endereco.bairro,
      cep: StringUtils.formatarCEP(StringUtils.somenteNumeros(this.fornecedor.endereco.cep)),
      cidade: this.fornecedor.endereco.cidade,
      estado: this.fornecedor.endereco.estado,
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

    documentoControl.updateValueAndValidity();
  }

  mascaraDocumento(value: string): void {
    const tipo = Number(this.tipoFornecedorForm().value);
    const masked = StringUtils.formatarDocumento(value, tipo);
    this.documento().setValue(masked, { emitEvent: false });
  }

  mascaraCep(value: string): void {
    const masked = StringUtils.formatarCEP(StringUtils.somenteNumeros(value));
    this.enderecoForm.get('cep')?.setValue(masked, { emitEvent: false });
  }

  documento(): AbstractControl {
    return this.fornecedorForm.get('documento')!;
  }

  tipoFornecedorForm(): AbstractControl {
    return this.fornecedorForm.get('tipoFornecedor')!;
  }

  buscarCep(cep: string): void {
    const cepFormatado = StringUtils.somenteNumeros(cep);

    if (cepFormatado.length < 8) {
      return;
    }

    this.fornecedorService
      .consultarCep(cepFormatado)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (cepRetorno) => this.preencherEnderecoConsulta(cepRetorno),
        error: (falha: { error: { errors: string[] } }) => {
          this.errorsEndereco.update((e) => [...e, ...falha.error.errors]);
        },
      });
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta): void {
    this.enderecoForm.patchValue({
      logradouro: cepConsulta.logradouro,
      bairro: cepConsulta.bairro,
      cep: cepConsulta.cep,
      cidade: cepConsulta.localidade,
      estado: cepConsulta.uf,
    });
  }

  editarFornecedor(): void {
    if (!this.fornecedorForm.dirty || !this.fornecedorForm.valid) return;

    this.fornecedor = { ...this.fornecedor, ...this.fornecedorForm.value };
    this.fornecedor.documento = StringUtils.somenteNumeros(this.fornecedor.documento);
    this.fornecedor.tipoFornecedor = Number(this.fornecedor.tipoFornecedor);

    this.fornecedorService
      .atualizarFornecedor(this.fornecedor)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (sucesso) => this.processarSucesso(sucesso),
        error: (falha) => this.processarFalha(falha),
      });
  }

  processarSucesso(_: unknown): void {
    this.errors.set([]);
    const toast = this.toastr.success('Fornecedor atualizado com sucesso!', 'Sucesso!');
    toast?.onHidden.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.router.navigate(['/fornecedores/listar-todos']);
    });
  }

  processarFalha(fail: { error: { errors: string[] } }): void {
    this.errors.set(fail.error.errors);
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  editarEndereco(): void {
    if (!this.enderecoForm.dirty || !this.enderecoForm.valid) return;

    this.endereco = { ...this.endereco, ...this.enderecoForm.value };
    this.endereco.cep = StringUtils.somenteNumeros(this.endereco.cep);
    this.endereco.fornecedorId = this.fornecedor.id;

    this.fornecedorService
      .atualizarEndereco(this.endereco)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.processarSucessoEndereco(this.endereco),
        error: (falha) => this.processarFalhaEndereco(falha),
      });
  }

  processarSucessoEndereco(endereco: Endereco): void {
    this.errorsEndereco.set([]);
    this.toastr.success('Endereço atualizado com sucesso!', 'Sucesso!');
    this.fornecedor.endereco = endereco;
    this.modalService.dismissAll();
  }

  processarFalhaEndereco(fail: { error: { errors: string[] } }): void {
    this.errorsEndereco.set(fail.error.errors);
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  abrirModal(content: TemplateRef<unknown>): void {
    this.modalService.open(content);
  }
}
