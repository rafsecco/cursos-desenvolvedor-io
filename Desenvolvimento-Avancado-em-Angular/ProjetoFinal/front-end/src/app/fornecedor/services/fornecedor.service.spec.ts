import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FornecedorService } from './fornecedor.service';
import { environment } from '@env/environment';
import { Fornecedor } from '../models/fornecedor';
import { CepConsulta } from '../models/endereco';

const mockFornecedor: Fornecedor = {
  id: 'f1',
  nome: 'Fornecedor Teste',
  documento: '12345678000195',
  tipoFornecedor: 1,
  ativo: true,
  endereco: {
    id: 'e1',
    logradouro: 'Rua Teste',
    numero: '100',
    complemento: '',
    bairro: 'Centro',
    cep: '01310100',
    cidade: 'São Paulo',
    estado: 'SP',
    fornecedorId: 'f1',
  },
  produtos: [],
};

describe('FornecedorService', () => {
  let service: FornecedorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FornecedorService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(FornecedorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('obterTodos()', () => {
    it('deve fazer GET para o endpoint fornecedores', () => {
      service.obterTodos().subscribe((res) => {
        expect(res).toEqual([mockFornecedor]);
      });

      const req = httpMock.expectOne(`${environment.apiUrlv1}fornecedores`);
      expect(req.request.method).toBe('GET');
      req.flush([mockFornecedor]);
    });
  });

  describe('obterPorId()', () => {
    it('deve fazer GET para o endpoint fornecedores/{id}', () => {
      service.obterPorId('f1').subscribe((res) => {
        expect(res).toEqual(mockFornecedor);
      });

      const req = httpMock.expectOne(`${environment.apiUrlv1}fornecedores/f1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockFornecedor);
    });
  });

  describe('novoFornecedor()', () => {
    it('deve fazer POST para o endpoint fornecedores', () => {
      service.novoFornecedor(mockFornecedor).subscribe((res) => {
        expect(res).toEqual(mockFornecedor);
      });

      const req = httpMock.expectOne(`${environment.apiUrlv1}fornecedores`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockFornecedor);
      req.flush(mockFornecedor);
    });
  });

  describe('atualizarFornecedor()', () => {
    it('deve fazer PUT para o endpoint fornecedores/{id}', () => {
      service.atualizarFornecedor(mockFornecedor).subscribe((res) => {
        expect(res).toEqual(mockFornecedor);
      });

      const req = httpMock.expectOne(`${environment.apiUrlv1}fornecedores/${mockFornecedor.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockFornecedor);
    });
  });

  describe('excluirFornecedor()', () => {
    it('deve fazer DELETE para o endpoint fornecedores/{id}', () => {
      service.excluirFornecedor('f1').subscribe();

      const req = httpMock.expectOne(`${environment.apiUrlv1}fornecedores/f1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockFornecedor);
    });
  });

  describe('consultarCep()', () => {
    const mockCep: CepConsulta = {
      cep: '01310-100',
      logradouro: 'Avenida Paulista',
      complemento: '',
      bairro: 'Bela Vista',
      localidade: 'São Paulo',
      uf: 'SP',
    };

    it('deve chamar a API ViaCEP com o CEP correto', () => {
      service.consultarCep('01310100').subscribe((res) => {
        expect(res).toEqual(mockCep);
      });

      const req = httpMock.expectOne('https://viacep.com.br/ws/01310100/json/');
      expect(req.request.method).toBe('GET');
      req.flush(mockCep);
    });

    it('deve propagar erro em caso de falha na consulta', () => {
      let erroRecebido = false;

      service.consultarCep('00000000').subscribe({ error: () => { erroRecebido = true; } });

      const req = httpMock.expectOne('https://viacep.com.br/ws/00000000/json/');
      req.flush({}, { status: 400, statusText: 'Bad Request' });

      expect(erroRecebido).toBe(true);
    });
  });
});
