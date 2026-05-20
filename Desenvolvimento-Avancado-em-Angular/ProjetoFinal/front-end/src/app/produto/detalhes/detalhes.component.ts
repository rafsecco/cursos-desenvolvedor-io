import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { environment } from '@env/environment';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalhesComponent {
  private readonly route = inject(ActivatedRoute);

  readonly imagens = environment.imagensUrl;
  readonly produto = this.route.snapshot.data['produto'] as Produto;
}
