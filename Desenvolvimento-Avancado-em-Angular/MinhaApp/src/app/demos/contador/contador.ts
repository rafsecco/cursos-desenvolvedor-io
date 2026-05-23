import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-contador',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container main-container">
      <h1>Contador</h1>

      <div class="contator">
        <div>
          <div
            tabindex="0"
            (keydown)="onKeyDown($event)"
            (blur)="onBlur($event)"
            (focus)="onFocus($event)"
          >
            <p>{{ valor() }}</p>

            <div tabindex="-1">
              <button type="button" tabindex="-1" (click)="incrementar()" [disabled]="isMaximo()">
                +
              </button>

              <button type="button" tabindex="-1" (click)="decrementar()" [disabled]="isMinimo()">
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Contador {
  readonly passo = input<number>(1);
  readonly min = input<number>(0);
  readonly max = input<number>(100);

  readonly alterado = output<number>();

  readonly valor = signal(0);
  readonly foco = signal(false);

  readonly isMinimo = computed(() => this.valor() <= this.min());

  readonly isMaximo = computed(() => this.valor() >= this.max());

  incrementar(): void {
    if (this.isMaximo()) {
      return;
    }

    const novoValor = this.valor() + this.passo();

    this.valor.set(Math.min(novoValor, this.max()));

    this.alterado.emit(this.valor());
  }

  decrementar(): void {
    if (this.isMinimo()) {
      return;
    }

    const novoValor = this.valor() - this.passo();

    this.valor.set(Math.max(novoValor, this.min()));

    this.alterado.emit(this.valor());
  }

  onBlur(event: FocusEvent): void {
    this.foco.set(false);

    event.preventDefault();
    event.stopPropagation();
  }

  onFocus(event: FocusEvent): void {
    this.foco.set(true);

    event.preventDefault();
    event.stopPropagation();
  }

  onKeyDown(event: KeyboardEvent): void {
    const handlers: Record<string, () => void> = {
      ArrowDown: () => this.decrementar(),
      ArrowUp: () => this.incrementar(),
    };

    const handler = handlers[event.code];

    if (!handler) {
      return;
    }

    handler();

    event.preventDefault();
    event.stopPropagation();
  }
}
