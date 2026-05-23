import { Locator, Page } from '@playwright/test';

export abstract class AppBasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navegarParaHome(): Promise<void> {
    await this.page.goto('/');
  }

  async navegarViaUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async navegarPorLink(link: string): Promise<void> {
    const locator = this.page.getByRole('link', { name: link, exact: true });
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  obterElementoXpath(xpath: string): Locator {
    return this.page.locator(`xpath=${xpath}`);
  }

  async esperar(milisegundos: number): Promise<void> {
    await this.page.waitForTimeout(milisegundos);
  }

  get email(): Locator {
    return this.page.locator('#email');
  }

  get senha(): Locator {
    return this.page.locator('#password');
  }

  async login(): Promise<void> {
    await this.navegarPorLink('Entrar');
    await this.email.fill('teste@teste.com');
    await this.senha.fill('Teste@123');
    await this.page.locator('#Login').click();
    await this.page.waitForURL('**/home', { timeout: 10000 });
  }
}
