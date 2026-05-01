import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from './filesize.pipe';
import { ImageFormaterPipe } from './image.pipe';
import { Filme } from './filmes.interface';

@Component({
  selector: 'app-filmes',
  imports: [CommonModule, FileSizePipe, ImageFormaterPipe],
  templateUrl: './filmes.html',
})
export class Filmes {

  filmes = signal<Filme[]>([
    {
      nome: 'Um Sonho de Liberdade',
      dataLancamento: new Date('1994-12-07'),
      valor: 150,
      imagem: 'sonhoLiberdade.jpg',
      tamanho: 513326980
    },
    {
      nome: 'O Poderoso Chefão',
      dataLancamento: new Date('1972-12-01'),
      valor: 200,
      imagem: 'poderosoChefaoI.jpg',
      tamanho: 1342177280
    },
    {
      nome: 'Batman: O Cavaleiro das Trevas',
      dataLancamento: new Date('2008-08-01'),
      valor: 70,
      imagem: 'Batman2008.jpg',
      tamanho: 719974720
    },
    {
      nome: 'O Poderoso Chefão 2',
      dataLancamento: new Date('1974-12-01'),
      valor: 120,
      imagem: 'poderosoChefaoII.jpg',
      tamanho: 1254589899
    },
    {
      nome: 'Pulp Fiction',
      dataLancamento: new Date('1994-08-01'),
      valor: 190,
      imagem: 'PulpFiction.jpg',
      tamanho: 773039680
    }
  ]);

}
