import { test, expect, Page, request } from '@playwright/test';
import { AppProdutoPage } from './app.cadastro-produto.po';

const BASE_URL = 'http://localhost:5000/api/v1';

async function verificarPreRequisitos(): Promise<void> {
  const ctx = await request.newContext();

  // ── Login ────────────────────────────────────────────────────────────────
  const loginRes = await ctx.post(`${BASE_URL}/entrar`, {
    data: { email: 'teste@teste.com', password: 'Teste@123' },
  });

  if (!loginRes.ok()) {
    await ctx.dispose();
    throw new Error(
      `Pré-requisito: login falhou (HTTP ${loginRes.status()}).\n` +
      'Crie o usuário pela tela de cadastro antes de rodar os testes.',
    );
  }

  const loginBody = await loginRes.json();
  const token: string = loginBody.data?.accessToken ?? loginBody.accessToken ?? '';

  if (!token) {
    await ctx.dispose();
    throw new Error(
      `Pré-requisito: token não encontrado na resposta do login.\n` +
      `Resposta recebida: ${JSON.stringify(loginBody)}`,
    );
  }

  // ── Fornecedores ─────────────────────────────────────────────────────────
  const fornRes = await ctx.get(`${BASE_URL}/fornecedores`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!fornRes.ok()) {
    await ctx.dispose();
    throw new Error(
      `Pré-requisito: GET /fornecedores falhou (HTTP ${fornRes.status()}).\n` +
      'Verifique se a API está rodando e se o token é válido.',
    );
  }

  const fornBody = await fornRes.json();

  // A API pode retornar { success, data: [...] } ou diretamente [...]
  const fornecedores: unknown[] = Array.isArray(fornBody)
    ? fornBody
    : Array.isArray(fornBody?.data)
      ? fornBody.data
      : [];

  await ctx.dispose();

  if (!fornecedores.length) {
    throw new Error(
      `Pré-requisito: nenhum fornecedor retornado pela API.\n` +
      `Resposta recebida: ${JSON.stringify(fornBody)}\n` +
      'Execute o script de seed:\n' +
      '  sqlcmd -S "(localdb)\\mssqllocaldb" -i e2e/seed.sql',
    );
  }
}

test.describe('Testes do formulario de cadastro', () => {
  let produtoPage: AppProdutoPage;
  const errosConsole: string[] = [];

  test.beforeAll(async () => {
    await verificarPreRequisitos();
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
