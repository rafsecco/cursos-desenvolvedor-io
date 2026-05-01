import { Component, inject, NgZone, signal } from '@angular/core';
import { BarServices, BarFactory, BEBIDA_SERVICE } from './bar.service';
import { BAR_UNIDADE_CONFIG, CONFIG_MANUAL_UNIDADE, BarUnidadeConfig } from './bar.config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bar-di-zones',
  templateUrl: './bar.component.html',
  providers: [
    BarServices,
    {
      provide: BarServices,
      useFactory: () => {
        const http = inject(HttpClient);
        const config = inject(BAR_UNIDADE_CONFIG);
        return new BarServices(http, config);
      },
    },
    { provide: BEBIDA_SERVICE, useExisting: BarServices },
  ],
})
export class BarComponent {
  private barServices = inject(BarServices);
  private configManual = inject(CONFIG_MANUAL_UNIDADE);
  private config = inject(BAR_UNIDADE_CONFIG);
  private ngZone = inject(NgZone);
  private bebidaService = inject(BEBIDA_SERVICE);

  ConfigManual: BarUnidadeConfig = this.configManual;
  Config: BarUnidadeConfig = this.config;

  barBebida1 = this.barServices.obterBebidas();
  barBebida2 = this.bebidaService.obterBebidas();
  dadosUnidade = this.barServices.obterUnidade();

  progress = signal(0);
  label = signal('');

  processWithinAngularZone() {
    this.label.set('dentro');
    this.progress.set(0);
    this._increaseProgress(() => console.log('Finalizado dentro!'));
  }

  processOutsideOfAngularZone() {
    this.label.set('fora');
    this.progress.set(0);

    this.ngZone.runOutsideAngular(() => {
      this._increaseProgress(() => {
        this.ngZone.run(() => console.log('Finalizado fora!'));
      });
    });
  }

  private _increaseProgress(done: () => void) {
    this.progress.update((v) => v + 1);
    console.log(`Progresso: ${this.progress()}%`);

    if (this.progress() < 100) {
      setTimeout(() => this._increaseProgress(done), 10);
    } else {
      done();
    }
  }
}
