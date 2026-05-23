import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomeComponente } from './nome-componente';

describe('NomeComponente', () => {
  let component: NomeComponente;
  let fixture: ComponentFixture<NomeComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomeComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(NomeComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
