import { InjectionToken } from '@angular/core';

export interface BarUnidadeConfig {
  unidadeId: number;
  unidadeToken: string;
}

export const BAR_UNIDADE_CONFIG = new InjectionToken<BarUnidadeConfig>('BAR_UNIDADE_CONFIG');

// novo (substitui string token)
export const CONFIG_MANUAL_UNIDADE = new InjectionToken<BarUnidadeConfig>('CONFIG_MANUAL_UNIDADE');
