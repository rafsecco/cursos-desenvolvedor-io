import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../models/produto';
import { CurrencyPipe, TitleCasePipe, NgClass } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'produt-card-detalhe',
  imports: [TitleCasePipe, CurrencyPipe, NgClass, RouterLink],
  templateUrl: './produto-card-detalhe.html',
  styles: ``,
})
export class ProdutoCardDetalhe {

  @Input() produto: Produto | null = null;

  @Output() status: EventEmitter<any> = new EventEmitter();

  emitirEvento() {
    this.status.emit(this.produto);
  }

}
