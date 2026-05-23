import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Field } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class FormBuilderService {
  constructor(private fb: FormBuilder) {}

  buildForm(fields: Field[]): FormGroup {
    const group = this.fb.group({});

    fields.forEach((field) => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      group.addControl(field.key, this.fb.control('', validators));
    });

    return group;
  }
}
