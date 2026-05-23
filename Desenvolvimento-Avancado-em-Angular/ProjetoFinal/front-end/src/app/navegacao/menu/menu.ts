import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuLogin } from '../menu-login/menu-login';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, MenuLogin],
  templateUrl: './menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  readonly isCollapsed = signal(true);

  toggleMenu(): void {
    this.isCollapsed.update((value) => !value);
  }
}
