import { ElementRef, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBaseComponent } from '@app/base-components/form-base.component';
import { Produto, Fornecedor } from './models/produto';

export abstract class ProdutoBaseComponent extends FormBaseComponent {
  readonly errors = signal<string[]>([]);

  produto: Produto = {} as Produto;
  fornecedores: Fornecedor[] = [];
  produtoForm!: FormGroup;

  constructor() {
    super();

    this.validationMessages = {
      fornecedorId: {
        required: 'Escolha um fornecedor',
      },
      nome: {
        required: 'Informe o Nome',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 200 caracteres',
      },
      descricao: {
        required: 'Informe a Descrição',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 1000 caracteres',
      },
      imagem: {
        required: 'Informe a Imagem',
      },
      valor: {
        required: 'Informe o Valor',
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  protected configurarValidacaoFormulario(formInputElements: ElementRef[]): void {
    super.configurarValidacaoFormularioBase(formInputElements, this.produtoForm);
  }
}
