import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot } from '@angular/router';
import { loginGuard, cadastroGuard } from './conta.guard';
import { Cadastro } from '../cadastro/cadastro';

const TOKEN_KEY = 'devio.token';

describe('loginGuard', () => {
  let router: Router;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve permitir navegação quando usuário não está logado', () => {
    const result = TestBed.runInInjectionContext(() =>
      loginGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('deve redirecionar para home quando usuário já está logado', () => {
    localStorage.setItem(TOKEN_KEY, 'token-existente');

    TestBed.runInInjectionContext(() =>
      loginGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('deve retornar true mesmo quando usuário está logado (não bloqueia a rota)', () => {
    localStorage.setItem(TOKEN_KEY, 'token-existente');

    const result = TestBed.runInInjectionContext(() =>
      loginGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );

    expect(result).toBe(true);
  });
});

describe('cadastroGuard', () => {
  const estadoAtual = {} as RouterStateSnapshot;
  const estadoProximo = {} as RouterStateSnapshot;
  const rota = {} as ActivatedRouteSnapshot;

  it('deve permitir saída quando não há mudanças não salvas', () => {
    const component = { mudancasNaoSalvas: false } as Cadastro;

    const result = cadastroGuard(component, rota, estadoAtual, estadoProximo);

    expect(result).toBe(true);
  });

  it('deve chamar window.confirm quando há mudanças não salvas', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const component = { mudancasNaoSalvas: true } as Cadastro;

    cadastroGuard(component, rota, estadoAtual, estadoProximo);

    expect(window.confirm).toHaveBeenCalledWith(
      'Tem certeza que deseja abandonar o preenchimento do formulário?',
    );
  });

  it('deve permitir saída quando usuário confirma abandono', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const component = { mudancasNaoSalvas: true } as Cadastro;

    const result = cadastroGuard(component, rota, estadoAtual, estadoProximo);

    expect(result).toBe(true);
  });

  it('deve cancelar saída quando usuário cancela o confirm', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const component = { mudancasNaoSalvas: true } as Cadastro;

    const result = cadastroGuard(component, rota, estadoAtual, estadoProximo);

    expect(result).toBe(false);
  });
});
