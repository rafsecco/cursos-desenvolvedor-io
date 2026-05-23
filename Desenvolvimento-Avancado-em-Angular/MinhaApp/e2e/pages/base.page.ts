import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navegarParaHome() {
    await this.page.goto('/');
  }

  async navegarViaUrl(url: string) {
    await this.page.goto(url);
  }

  async navegarPorLink(texto: string) {
    await this.page.getByRole('link', { name: texto }).click();
  }

  async validarConsoleSemErros() {
    const errors: string[] = [];

    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    expect(errors).toEqual([]);
  }
}
