export class CurrencyUtils {
  static stringParaDecimal(input: string | number | null | undefined): number {
    if (input == null) return 0;
    if (typeof input === 'number') return input;
    if (!input) return 0;

    return Number.parseFloat(input.replace(/\./g, '').replace(',', '.'));
  }

  static decimalParaString(input: number | null | undefined): string | null {
    if (input == null) {
      return null;
    }

    const value = input.toFixed(2);

    return value.replace('.', ',');
  }
}
