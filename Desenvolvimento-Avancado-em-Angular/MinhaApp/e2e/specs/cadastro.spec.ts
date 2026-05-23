import { test, expect } from '@playwright/test';
import { CadastroPage } from '../pages/cadastro.page';

test.describe('Testes do formulário de cadastro', () => {

  test('deve navegar até formulário de cadastro', async ({ page }) => {
    const cadastroPage = new CadastroPage(page);
    await cadastroPage.iniciarNavegacao();
    await expect(cadastroPage.titulo).toHaveText('Demo Cadastro');
  });

  test('deve preencher formulário de cadastro com sucesso', async ({ page }) => {
    const cadastroPage = new CadastroPage(page);
    await cadastroPage.iniciarNavegacao();
    await cadastroPage.preencherFormulario();
    await cadastroPage.botaoRegistrar.click();
    await expect(cadastroPage.resultadoCadastro).toContainText('"nome":"Rafael Secco"');
  });

  test('deve validar senhas diferentes', async ({ page }) => {
    const cadastroPage = new CadastroPage(page);
    await cadastroPage.iniciarNavegacao();

    await cadastroPage.campoNome.fill('Rafael Secco');
    await cadastroPage.campoCPF.fill('30390600822');
    await cadastroPage.campoEmail.fill('teste@teste.com');
    await cadastroPage.campoSenha.fill('Teste@2123');
    await cadastroPage.campoSenhaConfirmacao.fill('Teste@123');

    //await cadastroPage.campoSenha.focus();
    await cadastroPage.campoSenha.click();
    await cadastroPage.campoNome.click();
    // força blur
    // await cadastroPage.campoNome.click();

    await expect(cadastroPage.erroSenha).toContainText('As senhas não conferem');
  });
});
