import { test, expect, Page, request } from '@playwright/test';
import { AppProdutoPage } from './app.cadastro-produto.po';

const BASE_URL = 'http://localhost:5000/api/v1';

async function obterTokenTeste(): Promise<string> {
  const ctx = await request.newContext();
  const res = await ctx.post(`${BASE_URL}/entrar`, {
    data: { email: 'teste@teste.com', password: 'Teste@123' },
  });
  const body = await res.json();
  await ctx.dispose();
  return body.data?.accessToken ?? '';
}

test.describe('Testes do formulario de cadastro', () => {
  let produtoPage: AppProdutoPage;
  const errosConsole: string[] = [];

  test.beforeAll(async () => {
    const token = await obterTokenTeste();
    if (!token) return;

    const ctx = await request.newContext({
      extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    });

    const fornecedores = await ctx.get(`${BASE_URL}/fornecedores`);
    const { data } = await fornecedores.json();

    if (!data?.length) {
      await ctx.post(`${BASE_URL}/fornecedores`, {
        data: {
          nome: 'Fornecedor Setup Teste',
          documento: '12345678000195',
          tipoFornecedor: 2,
          ativo: true,
          endereco: {
            logradouro: 'Rua Teste',
            numero: '100',
            complemento: '',
            bairro: 'Centro',
            cep: '01001000',
            cidade: 'São Paulo',
            estado: 'SP',
          },
        },
      });
    }

    await ctx.dispose();
  });

  test.beforeEach(async ({ page }: { page: Page }) => {
    produtoPage = new AppProdutoPage(page);

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errosConsole.push(msg.text());
      }
    });

    errosConsole.length = 0;
  });

  test('deve navegar até produtos', async () => {
    await produtoPage.iniciarNavegacao();

    await expect(produtoPage.obterTituloProdutos()).toHaveText('Lista de Produtos');
  });

  test('deve preencher formulário de produtos com sucesso', async () => {
    await produtoPage.iniciarNavegacao();
    await produtoPage.navegarParaNovoProduto();

    await produtoPage.selecionarFornecedor();
    await produtoPage.nome.fill('Produto Teste Automatizado');
    await produtoPage.descricao.fill('Produto\nTeste Automatizado');
    await produtoPage.valor.fill('1234,50');
    await produtoPage.selecionarImagem();
    await produtoPage.ativo.click();
    await produtoPage.botaoProduto.click();

    await expect(produtoPage.obterTituloProdutos()).toHaveText('Lista de Produtos', {
      timeout: 10000,
    });
  });

  test.afterEach(async () => {
    expect(
      errosConsole,
      `Erros de console detectados: ${errosConsole.join(', ')}`,
    ).toHaveLength(0);
  });
});
