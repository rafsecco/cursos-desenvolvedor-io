export class CurrencyUtils {
  static stringParaDecimal(input: string | null | undefined): number {
    if (!input) {
      return 0;
    }

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
