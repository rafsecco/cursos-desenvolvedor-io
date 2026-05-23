import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CadastroPage extends BasePage {
  readonly titulo: Locator;
  readonly campoNome: Locator;
  readonly campoCPF: Locator;
  readonly campoEmail: Locator;
  readonly campoSenha: Locator;
  readonly campoSenhaConfirmacao: Locator;
  readonly botaoRegistrar: Locator;
  readonly resultadoCadastro: Locator;
  readonly erroSenha: Locator;

  constructor(page: Page) {
    super(page);

    this.titulo = page.getByRole('heading', {
      name: 'Demo Cadastro',
    });

    this.campoNome = page.locator('#nome');
    this.campoCPF = page.locator('#cpf');
    this.campoEmail = page.locator('#email');
    this.campoSenha = page.locator('#senha');
    this.campoSenhaConfirmacao = page.locator('#senhaConfirmacao');

    this.botaoRegistrar = page.getByRole('button', {
      name: 'Registrar',
    });

    //this.resultadoCadastro = page.locator('[data-testid="resultado-cadastro"]');
    this.resultadoCadastro = page.locator('#resultado-cadastro');

    this.erroSenha = page.getByText('As senhas não conferem');
  }

  async iniciarNavegacao() {
    await this.navegarParaHome();
    await this.navegarPorLink('Cadastro');
  }

  async preencherFormulario() {
    await this.campoNome.fill('Rafael Secco');
    await this.campoCPF.fill('30390600822');
    await this.campoEmail.fill('teste@teste.com');
    await this.campoSenha.fill('Teste@123');
    await this.campoSenhaConfirmacao.fill('Teste@123');
  }
}
