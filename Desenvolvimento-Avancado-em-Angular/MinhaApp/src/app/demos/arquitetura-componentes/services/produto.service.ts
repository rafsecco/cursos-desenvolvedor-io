import { Injectable, signal, computed } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtos = signal<Produto[]>([
    { id: 1, nome: 'Teste', ativo: true, valor: 100, imagem: 'celular.jpg' },
    { id: 2, nome: 'Teste 2', ativo: true, valor: 200, imagem: 'gopro.jpg' },
    { id: 3, nome: 'Teste 3', ativo: true, valor: 300, imagem: 'laptop.jpg' },
    { id: 4, nome: 'Teste 4', ativo: true, valor: 400, imagem: 'mouse.jpg' },
    { id: 5, nome: 'Teste 5', ativo: false, valor: 500, imagem: 'teclado.jpg' },
    { id: 6, nome: 'Teste 6', ativo: false, valor: 600, imagem: 'headset.jpg' },
  ]);

  // 🔍 todos
  // obterTodos() {
  //   return this.produtos.asReadonly();
  // }

  obterTodos(estado: string): Produto[] {
    if (estado === 'ativos') {
      return this.produtos().filter(p => p.ativo);
    }

    return this.produtos();
  }

  // 🔎 filtro reativo
  obterAtivos = computed(() => {
    return this.produtos().filter(p => p.ativo);
  });

  // 🔍 por id (não precisa mais ser função pura)
  obterPorId(id: number) {
    return computed(() =>
      this.produtos().find(p => p.id === id)
    );
  }

  // ✏️ exemplo de atualização
  atualizar(produtoAtualizado: Produto) {
    this.produtos.update(lista =>
      lista.map(p => p.id === produtoAtualizado.id ? produtoAtualizado : p)
    );
  }
}
