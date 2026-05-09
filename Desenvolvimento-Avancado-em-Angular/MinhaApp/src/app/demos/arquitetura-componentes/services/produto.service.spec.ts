import { TestBed } from '@angular/core/testing';

import { Produto } from '../models/produto';
import { ProdutoService } from './produto.service';

const produtosFake: Produto[] = [
  {
    id: 1,
    nome: 'Teste',
    ativo: true,
    valor: 100,
    imagem: 'celular.jpg',
  },
  {
    id: 2,
    nome: 'Teste 2',
    ativo: true,
    valor: 200,
    imagem: 'gopro.jpg',
  },
  {
    id: 3,
    nome: 'Teste 3',
    ativo: true,
    valor: 300,
    imagem: 'laptop.jpg',
  },
];

const produtoFake: Produto = {
  id: 2,
  nome: 'Teste 2',
  ativo: true,
  valor: 200,
  imagem: 'gopro.jpg',
};

describe('ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProdutoService],
    });

    service = TestBed.inject(ProdutoService);
  });

  it('deve retornar uma lista de produtos', () => {
    const spy = vi.spyOn(service, 'obterTodos').mockReturnValue(produtosFake);

    const result = service.obterTodos('ativos');

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith('ativos');

    expect(result).toHaveLength(3);
    expect(result).toEqual(produtosFake);
  });

  it('deve retornar um produto por id', () => {
    const spy = vi.spyOn(service, 'obterPorId').mockReturnValue(produtoFake);

    const result = service.obterPorId(2);

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(2);

    expect(result).toEqual(produtoFake);
    expect(result.id).toBe(2);
  });
});
