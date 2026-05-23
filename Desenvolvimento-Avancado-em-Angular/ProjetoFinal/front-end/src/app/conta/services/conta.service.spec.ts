import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ContaService } from './conta.service';
import { AuthStateService } from '@services/auth-state.service';
import { environment } from '@env/environment';
import { LoginResponse } from '../models/login-response';
import { LoginUsuario } from '../models/login-usuario';
import { RegistroUsuario } from '../models/registro-usuario';

const TOKEN_KEY = 'devio.token';

const mockResponse: LoginResponse = {
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

describe('ContaService', () => {
  let service: ContaService;
  let httpMock: HttpTestingController;
  let mockAuthState: { atualizar: ReturnType<typeof vi.fn>; limpar: ReturnType<typeof vi.fn>; token: ReturnType<typeof vi.fn>; usuario: ReturnType<typeof vi.fn>; logado: ReturnType<typeof vi.fn>; email: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    localStorage.clear();

    mockAuthState = {
      atualizar: vi.fn(),
      limpar: vi.fn(),
      token: vi.fn().mockReturnValue(null),
      usuario: vi.fn().mockReturnValue(null),
      logado: vi.fn().mockReturnValue(false),
      email: vi.fn().mockReturnValue(''),
    };

    TestBed.configureTestingModule({
      providers: [
        ContaService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthStateService, useValue: mockAuthState },
      ],
    });

    service = TestBed.inject(ContaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('registrarUsuario()', () => {
    it('deve fazer POST para o endpoint nova-conta', () => {
      const usuario: RegistroUsuario = {
        email: 'novo@teste.com',
        password: 'senha123',
        confirmPassword: 'senha123',
      };

      service.registrarUsuario(usuario).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrlv1}nova-conta`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(usuario);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush(mockResponse);
    });
  });

  describe('login()', () => {
    it('deve fazer POST para o endpoint entrar', () => {
      const usuario: LoginUsuario = {
        email: 'usuario@teste.com',
        password: 'senha123',
      };

      service.login(usuario).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrlv1}entrar`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(usuario);
      req.flush(mockResponse);
    });
  });

  describe('salvarResponseUsuario()', () => {
    it('deve atualizar o AuthStateService', () => {
      service.salvarResponseUsuario(mockResponse);

      expect(mockAuthState.atualizar).toHaveBeenCalledWith(mockResponse);
    });

    it('deve salvar o token no localStorage', () => {
      service.salvarResponseUsuario(mockResponse);

      expect(localStorage.getItem(TOKEN_KEY)).toBe('token-abc-123');
    });

    it('deve salvar os dados do usuário no localStorage', () => {
      service.salvarResponseUsuario(mockResponse);

      const user = JSON.parse(localStorage.getItem('devio.user') ?? 'null');
      expect(user?.email).toBe('usuario@teste.com');
    });
  });
});
