import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from "./navegacao/menu/menu";
import { Footer } from "./navegacao/footer/footer";
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Footer],
  providers: [ { provide: APP_BASE_HREF, useValue: '/' } ],
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
