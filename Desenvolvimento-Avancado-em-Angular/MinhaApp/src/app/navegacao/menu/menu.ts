import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [ RouterModule ],
  templateUrl: 'menu.html',
  styles: ``,
})
export class Menu {

  nav: Nav[] = [
    { link: 'home', name: 'Home', exact: true, admin: false },
    { link: 'todo', name: 'Todo', exact: true, admin: false },
    { link: 'contador', name: 'Contador', exact: true, admin: false },
    { link: 'filmes', name: 'Filmes', exact: true, admin: false },
    { link: 'bar', name: 'Bar', exact: true, admin: false },
    { link: 'produtos', name: 'Produtos', exact: false, admin: false },
    { link: 'cadastro', name: 'Cadastro', exact: false, admin: true },
    { link: 'form-dinamico', name: 'Form Dinâmico', exact: false, admin: true },
    { link: 'sobre', name: 'Sobre', exact: false, admin: false },
    { link: 'contato', name: 'Contato', exact: false, admin: false },
    { link: 'admin', name: 'Admin', exact: true, admin: true }
  ];
}


interface Nav {
  link: string,
  name: string,
  exact: boolean,
  admin: boolean
}
