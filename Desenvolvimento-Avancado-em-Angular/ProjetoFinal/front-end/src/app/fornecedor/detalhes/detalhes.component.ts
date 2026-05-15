import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Fornecedor } from '../models/fornecedor';
import { ListaProdutosComponent } from '../produtos/lista-produtos.component';
import { DocumentoPipe } from '@utils/documento.pipe';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  imports: [ListaProdutosComponent, RouterModule, DocumentoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalhesComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);
  readonly fornecedor = this.route.snapshot.data['fornecedor'] as Fornecedor;

  readonly enderecoMap: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
      this.enderecoCompleto,
    )}&key=GOOGLE_MAPS_KEY_REMOVED`,
  );

  get enderecoCompleto(): string {
    const endereco = this.fornecedor.endereco;

    return `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`;
  }
}
