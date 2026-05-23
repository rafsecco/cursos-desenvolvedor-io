import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextboxField } from '../../models/question.model';

@Component({
  selector: 'app-textbox-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-group row" [formGroup]="form">
      <label for="{{ field.key }}" class="col-md-2 control-label">{{ field.label }}</label>
      <div class="col-md-10">
        <input
          class="form-control"
          [id]="field.key"
          [type]="field.inputType || 'text'"
          [formControlName]="field.key"
          [attr.autocomplete]="field.autocomplete || 'off'"
          [placeholder]="field.required! ? field.label + ' (requerido)' : ''"
        />

        @if (form.get(field.key)?.invalid && form.get(field.key)?.touched) {
          <div class="text-danger">Campo obrigatório</div>
        }
      </div>
    </div>
  `,
})
export class TextboxFieldComponent {
  @Input() field!: TextboxField;
  @Input() form!: FormGroup;
}
