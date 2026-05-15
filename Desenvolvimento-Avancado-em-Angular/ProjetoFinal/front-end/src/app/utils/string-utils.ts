export class StringUtils {
  static isNullOrEmpty(value: string | null | undefined): boolean {
    return !value?.trim();
  }

  static somenteNumeros(numero: string): string {
    return numero.replace(/\D/g, '');
  }

  static formatarCPF(digits: string): string {
    const d = digits.slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  }

  static formatarCNPJ(digits: string): string {
    const d = digits.slice(0, 14);
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
    if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
    if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
  }

  static formatarDocumento(valor: string, tipo: number): string {
    const digits = StringUtils.somenteNumeros(valor);
    return tipo === 1 ? StringUtils.formatarCPF(digits) : StringUtils.formatarCNPJ(digits);
  }

  static formatarCEP(digits: string): string {
    const d = digits.slice(0, 8);
    if (d.length <= 5) return d;
    return `${d.slice(0, 5)}-${d.slice(5)}`;
  }
}
