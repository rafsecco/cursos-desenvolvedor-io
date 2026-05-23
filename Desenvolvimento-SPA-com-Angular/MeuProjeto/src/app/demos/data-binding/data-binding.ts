import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule, CommonModule],
  templateUrl: './data-binding.html',
  styles: ``,
})
export class DataBinding {
  public contadorClique: number = 0;
  public urlImagem: string = "https://angular.io/assets/images/logos/angular/angular.svg";
  public nome: string = "";

    adicionarClique(){
    this.contadorClique++;
  }

  zerarContador(){
    this.contadorClique = 0;
  }

  KeyUp(event: any){
    this.nome = event.target.value;
  }
}
