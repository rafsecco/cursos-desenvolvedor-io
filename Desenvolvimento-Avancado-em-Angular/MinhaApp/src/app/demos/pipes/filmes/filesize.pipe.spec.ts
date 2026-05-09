import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSizePipe } from './filesize.pipe';

describe('FileSizePipe', () => {
  describe('Teste Isolado', () => {
    const pipe = new FileSizePipe();

    it('Deve converter bytes para MB', () => {
      expect(pipe.transform(123456789)).toBe('117.74 MB');
      expect(pipe.transform(987654321)).toBe('941.90 MB');
    });

    it('Deve converter bytes para GB', () => {
      expect(pipe.transform(1342177280)).toBe('1.25 GB');
    });
  });

  describe('Teste comportamental do Pipe', () => {
    @Component({
      standalone: true,
      imports: [FileSizePipe],
      template: ` Size: {{ size() | filesize }} `,
    })
    class TestComponent {
      //size = 123456789;
      size = signal(123456789);
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let element: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });

    it('Deve converter bytes para MB', () => {
      fixture.detectChanges();
      expect(element.textContent).toContain('Size: 117.74 MB');
      component.size.set(1029281);
      fixture.detectChanges();
      // component.size = 1029281;
      // fixture.componentRef.changeDetectorRef.detectChanges();
      expect(element.textContent).toContain('Size: 0.98 MB');
    });

    it('Deve converter bytes para GB', () => {
      component.size.set(1342177280);
      fixture.detectChanges();
      // component.size = 1342177280;
      // fixture.componentRef.changeDetectorRef.detectChanges();
      expect(element.textContent).toContain('Size: 1.25 GB');
    });
  });
});
