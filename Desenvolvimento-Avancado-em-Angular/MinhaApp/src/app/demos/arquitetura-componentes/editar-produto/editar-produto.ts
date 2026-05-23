import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [TitleCasePipe, CurrencyPipe],
  templateUrl: './editar-produto.html',
})
export class EditarProduto {

  private route = inject(ActivatedRoute);
  private produtoService = inject(ProdutoService);
  private router = inject(Router);

  produtoId = toSignal(
    this.route.params.pipe(map(p => +p['id'])),
    { initialValue: 0 }
  );

  produto = computed(() =>
    this.produtoService.obterPorId(this.produtoId())()
  );
  /*
  👉 sim, parece estranho 😄
    primeiro () → pega o signal do service
    segundo () → pega o valor do signal
  */

    salvar() {
      const prod = this.produto();
      if (!prod) return;
      this.produtoService.atualizar(prod);
      this.router.navigate(['produtos']);
      //this.router.navigateByUrl('/produtos');
    }
}
