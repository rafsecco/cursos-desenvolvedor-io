import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly titulo: Locator;

  constructor(page: Page) {
    super(page);

    this.titulo = page.getByRole('heading', {
      name: 'Desenvolvimento Avançado em Angular',
    });
  }
}
