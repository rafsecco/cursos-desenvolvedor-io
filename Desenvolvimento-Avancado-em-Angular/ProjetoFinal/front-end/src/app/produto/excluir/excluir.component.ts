import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExcluirComponent {
  private readonly produtoService = inject(ProdutoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  private readonly destroyRef = inject(DestroyRef);

  readonly imagens = environment.imagensUrl;
  readonly produto = this.route.snapshot.data['produto'] as Produto;
  readonly errors = signal<string[]>([]);

  excluirProduto(): void {
    this.produtoService
      .excluirProduto(this.produto.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.processarSucesso(),
        error: () => this.toastr.error('Houve um erro no processamento!', 'Ops! :('),
      });
  }

  private processarSucesso(): void {
    const toast = this.toastr.success('Produto excluído com sucesso!', 'Good bye :D');
    toast?.onHidden.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.router.navigate(['/produtos/listar-todos']);
    });
  }
}
