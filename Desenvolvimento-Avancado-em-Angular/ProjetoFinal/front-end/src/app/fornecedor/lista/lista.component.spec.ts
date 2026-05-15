import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { of } from 'rxjs';

import { ListaComponent } from './lista.component';

import { FornecedorService } from '../services/fornecedor.service';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideRouter([]),
        {
          provide: FornecedorService,
          useValue: {
            obterTodos: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
