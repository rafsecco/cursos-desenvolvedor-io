import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';
import { RouterModule } from '@angular/router';
import { DocumentoPipe } from '@utils/documento.pipe';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  imports: [RouterModule, DocumentoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaComponent {
  private readonly fornecedorService = inject(FornecedorService);

  private readonly destroyRef = inject(DestroyRef);

  readonly fornecedores = signal<Fornecedor[]>([]);

  readonly errorMessage = signal('');

  constructor() {
    this.carregarFornecedores();
  }

  private carregarFornecedores(): void {
    this.fornecedorService
      .obterTodos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (fornecedores) => {
          this.fornecedores.set(fornecedores);
        },
        error: () => {
          this.errorMessage.set('Erro ao carregar fornecedores.');
        },
      });
  }
}
