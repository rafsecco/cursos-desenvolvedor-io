import { Endereco } from './endereco';
import { Produto } from '@app/produto/models/produto';

export interface Fornecedor {
  id: string;
  nome: string;
  documento: string;
  ativo: boolean;
  tipoFornecedor: number;
  endereco: Endereco;
  produtos: Produto[];
}

export enum TipoFornecedor {
  PessoaFisica = 1,
  PessoaJuridica = 2,
}
