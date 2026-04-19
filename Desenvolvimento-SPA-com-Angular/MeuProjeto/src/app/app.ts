import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from "./navegacao/menu/menu";
import { Home } from "./navegacao/home/home";
import { Footer } from "./navegacao/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Home, Footer],
  templateUrl: 'app.html',
  // template: `
  //   <h1>Hello, {{ title() }}</h1>

  //   <router-outlet />
  // `,
  styles: [],
})
export class App {
  protected readonly title = signal('MeuProjeto');
}
