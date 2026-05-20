import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormControlName, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { ProdutoBaseComponent } from '../produto-form.base.component';
import { ProdutoService } from '../services/produto.service';
import { CurrencyUtils } from '@utils/currency-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass, NgxMaskDirective],
  providers: [provideNgxMask()],
})
export class NovoComponent extends ProdutoBaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  private readonly fb = inject(FormBuilder);
  private readonly produtoService = inject(ProdutoService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  previewUrl: string | null = null;
  imagemBase64: string | null = null;
  imagemNome: string = '';

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.produtoService
      .obterFornecedores()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((fornecedores) => (this.fornecedores = fornecedores));

    this.produtoForm = this.fb.group({
      fornecedorId: ['', Validators.required],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      imagem: ['', Validators.required],
      valor: ['', Validators.required],
      ativo: [true],
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.imagemNome = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      this.previewUrl = result;
      this.imagemBase64 = result.split(',')[1];
    };
    reader.readAsDataURL(file);
  }

  adicionarProduto(): void {
    if (!this.produtoForm.dirty || !this.produtoForm.valid) return;

    const form = this.produtoForm.value;
    this.produto = {
      ...this.produto,
      fornecedorId: form.fornecedorId,
      nome: form.nome,
      descricao: form.descricao,
      ativo: form.ativo,
      imagemUpload: this.imagemBase64 ?? '',
      imagem: this.imagemNome,
      valor: CurrencyUtils.stringParaDecimal(form.valor),
    };

    this.produtoService
      .novoProduto(this.produto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (sucesso) => this.processarSucesso(sucesso),
        error: (falha: { error: { errors: string[] } }) => this.processarFalha(falha),
      });

    this.mudancasNaoSalvas = false;
  }

  private processarSucesso(_: unknown): void {
    this.produtoForm.reset();
    this.errors.set([]);
    this.previewUrl = null;
    this.imagemBase64 = null;
    this.imagemNome = '';

    const toast = this.toastr.success('Produto cadastrado com sucesso!', 'Sucesso!');
    toast?.onHidden.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.router.navigate(['/produtos/listar-todos']);
    });
  }

  private processarFalha(fail: { error: { errors: string[] } }): void {
    this.errors.set(fail.error.errors);
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
