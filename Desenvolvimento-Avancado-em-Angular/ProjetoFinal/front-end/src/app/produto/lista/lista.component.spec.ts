import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ListaComponent } from './lista.component';
import { ProdutoService } from '../services/produto.service';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaComponent],
      providers: [
        provideRouter([]),
        {
          provide: ProdutoService,
          useValue: { obterTodos: () => of([]) },
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

  it('deve iniciar com lista de produtos vazia', () => {
    expect(component.produtos()).toEqual([]);
  });
});
