import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Cadastro } from './cadastro';
import { ContaService } from '../services/conta.service';

describe('Cadastro', () => {
  let component: Cadastro;
  let fixture: ComponentFixture<Cadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cadastro],
      providers: [
        provideRouter([]),
        {
          provide: ContaService,
          useValue: {
            registrarUsuario: () => of({}),
            salvarResponseUsuario: vi.fn(),
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

    fixture = TestBed.createComponent(Cadastro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário de cadastro', () => {
    expect(component.cadastroForm).toBeTruthy();
  });
});
