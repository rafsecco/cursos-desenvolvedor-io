import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Login } from './login';
import { ContaService } from '../services/conta.service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        {
          provide: ContaService,
          useValue: {
            login: () => of({}),
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

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário de login', () => {
    expect(component['loginForm']).toBeTruthy();
  });
});
