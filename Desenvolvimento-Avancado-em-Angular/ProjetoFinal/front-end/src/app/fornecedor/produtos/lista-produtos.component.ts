import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '@app/produto/models/produto';
import { environment } from '@env/environment';

@Component({
  selector: 'lista-produto',
  standalone: true,
  templateUrl: './lista-produtos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, RouterLink],
})
export class ListaProdutosComponent {
  readonly imagens = environment.imagensUrl;
  readonly produtos = input.required<Produto[]>();
}
