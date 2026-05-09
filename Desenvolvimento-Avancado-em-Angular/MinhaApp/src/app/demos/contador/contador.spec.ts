import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contador } from './contador';

describe('Contador', () => {
  let component: Contador;
  let fixture: ComponentFixture<Contador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contador],
    }).compileComponents();

    fixture = TestBed.createComponent(Contador);
    component = fixture.componentInstance;

    component.valor.set(0);

    fixture.detectChanges();
  });

  it('deve incrementar corretamente', () => {
    component.incrementar();
    expect(component.valor()).toBe(1);
  });

  it('deve decrementar corretamente', () => {
    component.incrementar();
    expect(component.valor()).toBe(1);
    component.decrementar();
    expect(component.valor()).toBe(0);
  });

  it('não deve decrementar abaixo do valor permitido', () => {
    component.incrementar();
    expect(component.valor()).toBe(1);
    component.decrementar();
    expect(component.valor()).toBe(0);
    component.decrementar();
    expect(component.valor()).toBe(0);
  });

  it('não deve incrementar acima do valor permitido', () => {
    for (let i = 0; i < 200; i++) {
      component.incrementar();
    }
    expect(component.valor()).toBe(100);
  });

  it('deve emitir o valor alterado ao incrementar', () => {
    const spy = vi.fn();
    component.alterado.subscribe(spy);
    component.incrementar();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('deve atualizar foco ao receber focus e blur', () => {
    component.onFocus(new FocusEvent('focus'));
    expect(component.foco()).toBe(true);
    component.onBlur(new FocusEvent('blur'));
    expect(component.foco()).toBe(false);
  });

  it('deve incrementar ao pressionar ArrowUp', () => {
    const event = new KeyboardEvent('keydown', {
      code: 'ArrowUp',
    });
    component.onKeyDown(event);
    expect(component.valor()).toBe(1);
  });

  it('deve decrementar ao pressionar ArrowDown', () => {
    component.incrementar();
    const event = new KeyboardEvent('keydown', {
      code: 'ArrowDown',
    });
    component.onKeyDown(event);
    expect(component.valor()).toBe(0);
  });
});
