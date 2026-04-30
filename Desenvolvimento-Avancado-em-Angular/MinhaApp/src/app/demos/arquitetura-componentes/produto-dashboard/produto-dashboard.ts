import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  computed,
  inject
} from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoCardDetalhe } from '../componentes/produto-card-detalhe';
import { ProdutoCount } from '../componentes/produto-count';
import { fromEvent } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-produto-dashboard',
  standalone: true,
  imports: [ProdutoCardDetalhe, ProdutoCount],
  templateUrl: './produto-dashboard.html',
})
export class ProdutoDashboard implements AfterViewInit {

  private route = inject(ActivatedRoute);

  // 🔥 SIGNAL REATIVO (substitui snapshot)
  produtos = toSignal(
    this.route.data.pipe(map(d => d['produtos'] as Produto[])),
    { initialValue: [] }
  );

  routeData = toSignal(this.route.data, { initialValue: {} as any });
  teste = computed(() => this.routeData()['teste']);
  //console.log('teste:', this.teste());


  @ViewChild(ProdutoCount) contador!: ProdutoCount;
  @ViewChild('teste') mensagemTela!: ElementRef;
  @ViewChildren(ProdutoCardDetalhe) botoes!: QueryList<ProdutoCardDetalhe>;

  ngAfterViewInit(): void {
    fromEvent(this.mensagemTela.nativeElement, 'click')
      .subscribe(() => alert('Clicou no texto!'));

    console.log('contador:', this.contador?.produtos);
    console.log('botoes:', this.botoes);
    console.log('teste: ', this.teste());

    this.botoes?.forEach(b => console.log(b.produto));
  }

  mudarStatus(produto: Produto) {
    produto.ativo = !produto.ativo;
  }
}
