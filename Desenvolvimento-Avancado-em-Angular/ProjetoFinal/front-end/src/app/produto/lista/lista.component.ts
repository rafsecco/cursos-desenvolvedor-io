import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaComponent {
  private readonly produtoService = inject(ProdutoService);

  readonly imagens = environment.imagensUrl;
  readonly produtos = signal<Produto[]>([]);
  readonly errorMessage = signal('');

  constructor() {
    this.produtoService
      .obterTodos()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (produtos) => this.produtos.set(produtos),
        error: () => this.errorMessage.set('Erro ao carregar produtos.'),
      });
  }
}
