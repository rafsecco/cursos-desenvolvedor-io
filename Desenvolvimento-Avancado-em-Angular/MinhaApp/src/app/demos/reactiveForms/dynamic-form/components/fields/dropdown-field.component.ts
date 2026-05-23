import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownField } from '../../models/question.model';

@Component({
  selector: 'app-dropdown-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-group row" [formGroup]="form">
      <label for="{{ field.key }}" class="col-md-2 control-label">{{ field.label }}</label>
      <div class="col-md-10">
        <select class="form-control" [id]="field.key" [formControlName]="field.key">
          @for (opt of field.options; track field.options) {
            <option [value]="opt.key">{{ opt.value }}</option>
          }
        </select>
        @if (form.get(field.key)?.invalid && form.get(field.key)?.touched) {
          <div class="text-danger">Campo obrigatório</div>
        }
      </div>
    </div>
  `,
})
export class DropdownFieldComponent {
  @Input() field!: DropdownField;
  @Input() form!: FormGroup;
}
