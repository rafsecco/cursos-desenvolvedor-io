import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomFormValidators {
  static rangeLength(arg0: number[]): ValidatorFn {
    throw new Error('Method not implemented.');
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
