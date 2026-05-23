import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { of } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { NovoComponent } from './novo.component';

import { FornecedorService } from '../services/fornecedor.service';

describe('NovoComponent', () => {
  let component: NovoComponent;
  let fixture: ComponentFixture<NovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideRouter([]),
        {
          provide: FornecedorService,
          useValue: {
            consultarCep: () => of({}),
            novoFornecedor: () => of({}),
          },
        },
        {
          provide: ToastrService,
          useValue: {
            success: () => ({
              onHidden: of(true),
            }),
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
});
