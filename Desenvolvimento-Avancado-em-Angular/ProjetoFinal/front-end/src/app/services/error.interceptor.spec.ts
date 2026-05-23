import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { errorInterceptor } from './error.interceptor';
import { LocalStorageUtils } from '@utils/localstorage';
import { AuthStateService } from './auth-state.service';

describe('errorInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let router: Router;
  let mockLocalStorage: { limparDadosLocaisUsuario: ReturnType<typeof vi.fn>; obterTokenUsuario: ReturnType<typeof vi.fn>; obterUsuario: ReturnType<typeof vi.fn> };
  let mockAuthState: { limpar: ReturnType<typeof vi.fn>; token: ReturnType<typeof vi.fn>; usuario: ReturnType<typeof vi.fn>; logado: ReturnType<typeof vi.fn>; email: ReturnType<typeof vi.fn>; atualizar: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockLocalStorage = {
      limparDadosLocaisUsuario: vi.fn(),
      obterTokenUsuario: vi.fn().mockReturnValue(null),
      obterUsuario: vi.fn().mockReturnValue(null),
    };

    mockAuthState = {
      limpar: vi.fn(),
      atualizar: vi.fn(),
      token: vi.fn().mockReturnValue(null),
      usuario: vi.fn().mockReturnValue(null),
      logado: vi.fn().mockReturnValue(false),
      email: vi.fn().mockReturnValue(''),
    };

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: LocalStorageUtils, useValue: mockLocalStorage },
        { provide: AuthStateService, useValue: mockAuthState },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve limpar auth state e redirecionar para login em erro 401', () => {
    httpClient.get('/api/protegido').subscribe({ error: () => {} });

    const req = httpMock.expectOne('/api/protegido');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(mockLocalStorage.limparDadosLocaisUsuario).toHaveBeenCalled();
    expect(mockAuthState.limpar).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(
      ['/conta/login'],
      expect.objectContaining({ queryParams: expect.anything() }),
    );
  });

  it('deve redirecionar para acesso-negado em erro 403', () => {
    httpClient.get('/api/protegido').subscribe({ error: () => {} });

    const req = httpMock.expectOne('/api/protegido');
    req.flush({}, { status: 403, statusText: 'Forbidden' });

    expect(router.navigate).toHaveBeenCalledWith(['/acesso-negado']);
  });

  it('não deve redirecionar para login em erro 403', () => {
    httpClient.get('/api/protegido').subscribe({ error: () => {} });

    const req = httpMock.expectOne('/api/protegido');
    req.flush({}, { status: 403, statusText: 'Forbidden' });

    expect(mockAuthState.limpar).not.toHaveBeenCalled();
  });

  it('deve propagar o erro para o subscriber', () => {
    let erroRecebido = false;

    httpClient.get('/api/protegido').subscribe({ error: () => { erroRecebido = true; } });

    const req = httpMock.expectOne('/api/protegido');
    req.flush({}, { status: 500, statusText: 'Server Error' });

    expect(erroRecebido).toBe(true);
  });

  it('não deve redirecionar em erros 4xx não tratados', () => {
    httpClient.get('/api/protegido').subscribe({ error: () => {} });

    const req = httpMock.expectOne('/api/protegido');
    req.flush({}, { status: 404, statusText: 'Not Found' });

    expect(router.navigate).not.toHaveBeenCalled();
  });
});
