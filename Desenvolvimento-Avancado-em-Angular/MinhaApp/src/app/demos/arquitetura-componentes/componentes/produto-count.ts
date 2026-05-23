import { Component, input, computed } from '@angular/core';
import { Produto } from '../models/produto';

@Component({
  selector: 'produto-count',
  standalone: true,
  template: `
    <div>
      <h3>Produtos</h3>
      <div>
        Produtos Ativos: {{ contadorAtivos() }}
        no total de {{ produtos().length }} produtos.
        <br /><br />
      </div>
    </div>
  `
})
export class ProdutoCount {

  // 🔥 input como SIGNAL
  produtos = input<Produto[]>([]);

  // 🔥 computed automático
  contadorAtivos = computed(() =>
    this.produtos().filter(p => p.ativo).length
  );
}
