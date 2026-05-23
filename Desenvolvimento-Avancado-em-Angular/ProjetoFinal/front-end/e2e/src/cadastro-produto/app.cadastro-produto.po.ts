import { Locator, Page } from '@playwright/test';
import * as path from 'path';
import { AppBasePage } from '../app.base.po';

export class AppProdutoPage extends AppBasePage {
  constructor(page: Page) {
    super(page);
  }

  async navegarParaProdutos(): Promise<void> {
    await this.navegarPorLink('Produtos');
  }

  async navegarParaNovoProduto(): Promise<void> {
    await this.navegarPorLink('Novo Produto');
  }

  async iniciarNavegacao(): Promise<void> {
    await this.navegarParaHome();
    await this.login();
    await this.navegarParaProdutos();
  }

  obterTituloProdutos(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  async selecionarFornecedor(): Promise<void> {
    const select = this.page.locator('select#fornecedorId');

    // Clica no select para disparar a detecção de mudanças do Angular.
    // Com SSR/hydration, o ciclo de CD não roda automaticamente após o HTTP
    // responder — um evento de usuário é necessário para acionar o re-render.
    await select.click();

    await this.page.waitForSelector('select#fornecedorId option:nth-child(2)', {
      timeout: 10000,
    }).catch(() => {
      throw new Error(
        'Nenhum fornecedor encontrado no select. Verifique se há fornecedores cadastrados no banco para o usuário de teste.',
      );
    });

    await select.selectOption({ index: 1 });
  }

  get nome(): Locator {
    return this.page.locator('#nome');
  }

  get descricao(): Locator {
    return this.page.locator('#descricao');
  }

  get valor(): Locator {
    return this.page.locator('#valor');
  }

  get ativo(): Locator {
    return this.page.locator('#ativo');
  }

  get botaoProduto(): Locator {
    return this.page.locator('#cadastroProduto');
  }

  async selecionarImagem(): Promise<void> {
    const caminho = path.resolve(__dirname, 'imagem_teste.jpg');
    await this.page.locator('#imagem').setInputFiles(caminho);
  }
}
