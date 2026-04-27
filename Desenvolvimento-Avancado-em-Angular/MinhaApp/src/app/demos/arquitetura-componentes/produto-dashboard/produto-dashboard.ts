import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoCardDetalhe } from '../componentes/produto-card-detalhe';
import { ProdutoCount } from '../componentes/produto-count';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-produto-dashboard',
  imports: [ProdutoCardDetalhe, ProdutoCount],
  templateUrl: './produto-dashboard.html',
  styles: ``,
})
export class ProdutoDashboard implements AfterViewInit {

  produtos: Produto[] = [];

  @ViewChild(ProdutoCount, { static: false }) contador: ProdutoCount | null = null;
  @ViewChild('teste', { static: false }) mensagemTela: ElementRef | null = null;
  @ViewChildren(ProdutoCardDetalhe) botoes: QueryList<ProdutoCardDetalhe> | null = null;

  constructor() {}

  ngAfterViewInit(): void {
    let clickTexto: Observable<any> = fromEvent(this.mensagemTela!.nativeElement, 'click');
    clickTexto.subscribe(() => {
      alert('Clicou no texto!');
      return; // para não entrar em loop infinito, pois o alert também é um click
    });

    console.log('Objeto contador: ', this.contador?.produtos);

    console.log('Botoes: ', this.botoes);
    this.botoes?.forEach(element => {
      console.log(element.produto);
    });
  }

  ngOnInit() {
    this.produtos = [
      {
        id: 1,
        nome: 'Teste',
        ativo: true,
        valor: 100,
        imagem: 'celular.jpg',
      },
      {
        id: 2,
        nome: 'Teste 2',
        ativo: true,
        valor: 200,
        imagem: 'gopro.jpg',
      },
      {
        id: 3,
        nome: 'Teste 3',
        ativo: true,
        valor: 300,
        imagem: 'laptop.jpg',
      },
      {
        id: 4,
        nome: 'Teste 4',
        ativo: true,
        valor: 400,
        imagem: 'mouse.jpg',
      },
      {
        id: 5,
        nome: 'Teste 5',
        ativo: true,
        valor: 500,
        imagem: 'teclado.jpg',
      },
      {
        id: 6,
        nome: 'Teste 6',
        ativo: false,
        valor: 600,
        imagem: 'headset.jpg',
      },
    ];
  }

  mudarStatus(event: Produto) {
    event.ativo = !event.ativo;
  }
}
