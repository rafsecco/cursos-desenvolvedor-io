import { FormControl } from '@angular/forms';
import { CustomFormValidators } from './custom-form-validators';

describe('CustomFormValidators', () => {
  describe('rangeLength', () => {
    const validator = CustomFormValidators.rangeLength([3, 8]);

    it('deve retornar null quando o valor está vazio', () => {
      expect(validator(new FormControl(''))).toBeNull();
    });

    it('deve retornar null quando o comprimento está dentro do range', () => {
      expect(validator(new FormControl('abc'))).toBeNull();
    });

    it('deve retornar null quando o comprimento é igual ao máximo', () => {
      expect(validator(new FormControl('abcdefgh'))).toBeNull();
    });

    it('deve retornar null quando o comprimento é igual ao mínimo', () => {
      expect(validator(new FormControl('abc'))).toBeNull();
    });

    it('deve retornar erro quando o comprimento é menor que o mínimo', () => {
      expect(validator(new FormControl('ab'))).toEqual({ rangeLength: true });
    });

    it('deve retornar erro quando o comprimento excede o máximo', () => {
      expect(validator(new FormControl('abcdefghi'))).toEqual({ rangeLength: true });
    });
  });

  describe('matchValues', () => {
    it('deve retornar null quando os valores são iguais', () => {
      const senha = new FormControl('senha123');
      const validator = CustomFormValidators.matchValues(() => senha);
      expect(validator(new FormControl('senha123'))).toBeNull();
    });

    it('deve retornar erro quando os valores são diferentes', () => {
      const senha = new FormControl('senha123');
      const validator = CustomFormValidators.matchValues(() => senha);
      expect(validator(new FormControl('senha456'))).toEqual({ equalTo: true });
    });

    it('deve retornar null quando o controle pai é null', () => {
      const validator = CustomFormValidators.matchValues(() => null);
      expect(validator(new FormControl('qualquervalor'))).toBeNull();
    });

    it('deve retornar null quando ambos os valores são strings vazias', () => {
      const senha = new FormControl('');
      const validator = CustomFormValidators.matchValues(() => senha);
      expect(validator(new FormControl(''))).toBeNull();
    });
  });
});
