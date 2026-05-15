import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomFormValidators {
  static rangeLength([min, max]: [number, number]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      if (!value) return null;
      return value.length >= min && value.length <= max ? null : { rangeLength: true };
    };
  }
  static matchValues(matchTo: () => AbstractControl | null): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = matchTo();

      if (!parent) {
        return null;
      }

      return control.value === parent.value ? null : { equalTo: true };
    };
  }
}
