import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Testes da página inicial', () => {
  test('deve exibir uma mensagem na pagina inicial', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navegarParaHome();

    await expect(homePage.titulo).toHaveText('Desenvolvimento Avançado em Angular');
  });
});
