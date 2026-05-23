import { TestBed } from '@angular/core/testing';
import { AuthStateService } from './auth-state.service';
import { LocalStorageUtils } from '@utils/localstorage';
import { LoginResponse } from '@app/conta/models/login-response';

const mockLoginResponse: LoginResponse = {
  success: true,
  data: {
    accessToken: 'token-abc-123',
    expiresIn: 3600,
    userToken: {
      id: '1',
      email: 'usuario@teste.com',
      claims: [{ type: 'Produto', value: 'Adicionar' }],
    },
  },
};

describe('AuthStateService', () => {
  let service: AuthStateService;
  let mockLocalStorage: { obterTokenUsuario: ReturnType<typeof vi.fn>; obterUsuario: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockLocalStorage = {
      obterTokenUsuario: vi.fn().mockReturnValue(null),
      obterUsuario: vi.fn().mockReturnValue(null),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthStateService,
        { provide: LocalStorageUtils, useValue: mockLocalStorage },
      ],
    });

    service = TestBed.inject(AuthStateService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('logado deve ser false quando não há token', () => {
    expect(service.logado()).toBe(false);
  });

  it('logado deve ser true após atualizar()', () => {
    service.atualizar(mockLoginResponse);
    expect(service.logado()).toBe(true);
  });

  it('token deve ter o valor correto após atualizar()', () => {
    service.atualizar(mockLoginResponse);
    expect(service.token()).toBe('token-abc-123');
  });

  it('email deve retornar o email do usuário após atualizar()', () => {
    service.atualizar(mockLoginResponse);
    expect(service.email()).toBe('usuario@teste.com');
  });

  it('email deve ser string vazia quando não há usuário', () => {
    expect(service.email()).toBe('');
  });

  it('limpar() deve setar logado como false', () => {
    service.atualizar(mockLoginResponse);
    service.limpar();
    expect(service.logado()).toBe(false);
  });

  it('limpar() deve limpar o token', () => {
    service.atualizar(mockLoginResponse);
    service.limpar();
    expect(service.token()).toBeNull();
  });

  it('limpar() deve limpar o email', () => {
    service.atualizar(mockLoginResponse);
    service.limpar();
    expect(service.email()).toBe('');
  });

  it('deve inicializar token a partir do localStorage', () => {
    mockLocalStorage.obterTokenUsuario.mockReturnValue('token-existente');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AuthStateService,
        { provide: LocalStorageUtils, useValue: mockLocalStorage },
      ],
    });
    const novoService = TestBed.inject(AuthStateService);

    expect(novoService.token()).toBe('token-existente');
    expect(novoService.logado()).toBe(true);
  });
});
