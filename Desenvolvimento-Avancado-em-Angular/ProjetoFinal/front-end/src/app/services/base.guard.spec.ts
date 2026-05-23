import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router } from '@angular/router';
import { BaseGuard } from './base.guard';
import { UsuarioToken } from '@app/conta/models/usuario-token';

class GuardConcreta extends BaseGuard {
  verificar(route: ActivatedRouteSnapshot): boolean {
    return this.validarClaims(route);
  }
}

const criarRota = (claim?: { nome: string; valor: string }): ActivatedRouteSnapshot =>
  ({ data: claim ? { claim } : {} }) as unknown as ActivatedRouteSnapshot;

const TOKEN_KEY = 'devio.token';
const USER_KEY = 'devio.user';

describe('BaseGuard', () => {
  let guard: GuardConcreta;
  let router: Router;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [GuardConcreta, provideRouter([])],
    });

    guard = TestBed.inject(GuardConcreta);
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve redirecionar para login quando não há token', () => {
    const result = guard.verificar(criarRota());

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(
      ['/conta/login'],
      expect.objectContaining({ queryParams: expect.anything() }),
    );
  });

  it('deve permitir acesso quando há token e rota não exige claim', () => {
    localStorage.setItem(TOKEN_KEY, 'token-valido');

    const result = guard.verificar(criarRota());

    expect(result).toBe(true);
  });

  it('deve redirecionar para acesso-negado quando usuário não tem claims', () => {
    localStorage.setItem(TOKEN_KEY, 'token-valido');
    const usuario: UsuarioToken = { claims: [] };
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));

    const result = guard.verificar(criarRota({ nome: 'Produto', valor: 'Adicionar' }));

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/acesso-negado']);
  });

  it('deve redirecionar para acesso-negado quando claim não existe para o tipo requerido', () => {
    localStorage.setItem(TOKEN_KEY, 'token-valido');
    const usuario: UsuarioToken = { claims: [{ type: 'Fornecedor', value: 'Adicionar' }] };
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));

    const result = guard.verificar(criarRota({ nome: 'Produto', valor: 'Adicionar' }));

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/acesso-negado']);
  });

  it('deve redirecionar para acesso-negado quando valor do claim não inclui a permissão', () => {
    localStorage.setItem(TOKEN_KEY, 'token-valido');
    const usuario: UsuarioToken = { claims: [{ type: 'Produto', value: 'Visualizar' }] };
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));

    const result = guard.verificar(criarRota({ nome: 'Produto', valor: 'Adicionar' }));

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/acesso-negado']);
  });

  it('deve permitir acesso quando usuário tem a claim requerida', () => {
    localStorage.setItem(TOKEN_KEY, 'token-valido');
    const usuario: UsuarioToken = { claims: [{ type: 'Produto', value: 'Adicionar,Editar' }] };
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));

    const result = guard.verificar(criarRota({ nome: 'Produto', valor: 'Adicionar' }));

    expect(result).toBe(true);
  });

  it('deve redirecionar para acesso-negado quando usuário é null (mas há token)', () => {
    localStorage.setItem(TOKEN_KEY, 'token-valido');

    const result = guard.verificar(criarRota({ nome: 'Produto', valor: 'Adicionar' }));

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/acesso-negado']);
  });
});
