import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from "./navegacao/menu/menu";
import { Footer } from "./navegacao/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Footer],
  templateUrl: 'app.html',
  // template: `
  //   <h1>Hello, {{ title() }}</h1>

  //   <router-outlet />
  // `,
  styles: [],
})
export class App {
  protected readonly title = signal('MinhaApp');
}
