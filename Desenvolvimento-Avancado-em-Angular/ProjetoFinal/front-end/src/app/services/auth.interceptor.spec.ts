import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { authInterceptor } from './auth.interceptor';
import { LocalStorageUtils } from '@utils/localstorage';
import { environment } from '@env/environment';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let mockLocalStorage: { obterTokenUsuario: ReturnType<typeof vi.fn> };

  const apiUrl = `${environment.apiUrlv1}produtos`;
  const externalUrl = 'https://viacep.com.br/ws/01310100/json/';

  beforeEach(() => {
    mockLocalStorage = {
      obterTokenUsuario: vi.fn().mockReturnValue(null),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: LocalStorageUtils, useValue: mockLocalStorage },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve adicionar header Authorization quando há token e URL é da API', () => {
    mockLocalStorage.obterTokenUsuario.mockReturnValue('meu-token');

    httpClient.get(apiUrl).subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.headers.get('Authorization')).toBe('Bearer meu-token');
    req.flush({});
  });

  it('não deve adicionar header Authorization quando não há token', () => {
    mockLocalStorage.obterTokenUsuario.mockReturnValue(null);

    httpClient.get(apiUrl).subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('não deve adicionar header Authorization para URLs externas (ViaCEP)', () => {
    mockLocalStorage.obterTokenUsuario.mockReturnValue('meu-token');

    httpClient.get(externalUrl).subscribe();

    const req = httpMock.expectOne(externalUrl);
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('não deve adicionar header Authorization quando PLATFORM_ID é server', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: LocalStorageUtils, useValue: mockLocalStorage },
      ],
    });

    mockLocalStorage.obterTokenUsuario.mockReturnValue('meu-token');
    const client = TestBed.inject(HttpClient);
    const mock = TestBed.inject(HttpTestingController);

    client.get(apiUrl).subscribe();

    const req = mock.expectOne(apiUrl);
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
    mock.verify();
  });
});
