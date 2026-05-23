import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DetalhesComponent } from './detalhes.component';

registerLocaleData(localePt);

const mockProduto = {
  id: 'p1',
  nome: 'Produto Teste',
  descricao: 'Descrição do produto',
  imagem: 'imagem.jpg',
  imagemUpload: '',
  valor: 9.99,
  dataCadastro: '2024-01-01T00:00:00',
  ativo: true,
  fornecedorId: 'f1',
  nomeFornecedor: 'Fornecedor Teste',
};

describe('DetalhesComponent', () => {
  let component: DetalhesComponent;
  let fixture: ComponentFixture<DetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesComponent],
      providers: [
        provideRouter([]),
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { produto: mockProduto } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o produto vindo do resolver', () => {
    expect(component.produto).toEqual(mockProduto);
  });
});
