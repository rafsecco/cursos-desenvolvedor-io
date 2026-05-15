import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';
import { DocumentoPipe } from '@utils/documento.pipe';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  imports: [RouterLink, DocumentoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExcluirComponent {
  private readonly fornecedorService = inject(FornecedorService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);
  readonly fornecedor = this.route.snapshot.data['fornecedor'] as Fornecedor;

  readonly enderecoMap: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
      this.enderecoCompleto,
    )}&key=GOOGLE_MAPS_KEY_REMOVED`,
  );

  readonly errors = signal<string[]>([]);

  get enderecoCompleto(): string {
    const endereco = this.fornecedor.endereco;

    return `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`;
  }

  excluirEvento(): void {
    this.fornecedorService
      .excluirFornecedor(this.fornecedor.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (fornecedor) => this.sucessoExclusao(fornecedor),
        error: (error) => this.falha(error),
      });
  }

  private sucessoExclusao(_: unknown): void {
    const toast = this.toastr.success('Fornecedor excluido com Sucesso!', 'Good bye :D');

    toast?.onHidden.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.router.navigate(['/fornecedores/listar-todos']);
    });
  }

  private falha(fail: { error: { errors: string[] } }): void {
    this.errors.set(fail.error.errors);
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
