export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  imagemUpload: string;
  valor: number;
  dataCadastro: string;
  ativo: boolean;
  fornecedorId: string;
  nomeFornecedor: string;
}

export interface Fornecedor {
  id: string;
  nome: string;
}
