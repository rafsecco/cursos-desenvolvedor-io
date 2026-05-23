import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NEVER, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NovoComponent } from './novo.component';
import { ProdutoService } from '../services/produto.service';

describe('NovoComponent', () => {
  let component: NovoComponent;
  let fixture: ComponentFixture<NovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoComponent],
      providers: [
        provideRouter([]),
        {
          provide: ProdutoService,
          useValue: {
            // NEVER evita que cdr.detectChanges() seja chamado antes de produtoForm ser inicializado
            obterFornecedores: () => NEVER,
            novoProduto: () => of({}),
          },
        },
        {
          provide: ToastrService,
          useValue: {
            success: () => ({ onHidden: of(true) }),
            error: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário de produto', () => {
    expect(component.produtoForm).toBeTruthy();
  });

  it('formulário deve ser inválido quando vazio', () => {
    expect(component.produtoForm.valid).toBe(false);
  });
});
