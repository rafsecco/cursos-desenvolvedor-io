import { Component, signal } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Menu } from './navegacao/menu/menu';
import { Footer } from './navegacao/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Footer],
  providers: [ { provide: APP_BASE_HREF, useValue: '/' } ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-end');
}
