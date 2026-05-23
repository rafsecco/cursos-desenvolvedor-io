import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../produto.service ';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-produto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-produto.html',
  styles: []
})
export class ListaProduto {

  produtos$;
  constructor(private produtoService: ProdutoService) {
    this.produtos$ = this.produtoService.obterProdutos();
  }
}
