import { Directive, Input, ViewContainerRef, OnInit, inject, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from './models/question.model';

import { TextboxFieldComponent } from './components/fields/textbox-field.component';
import { DropdownFieldComponent } from './components/fields/dropdown-field.component';

// const mapper: Record<string, Type<any>> = {
//   textbox: TextboxFieldComponent,
//   dropdown: DropdownFieldComponent,
// };

const mapper: Record<Field['type'], Type<any>> = {
  textbox: TextboxFieldComponent,
  dropdown: DropdownFieldComponent
};


@Directive({
  selector: '[dynamicField]',
  standalone: true,
})
export class DynamicFieldDirective implements OnInit {
  private vcr = inject(ViewContainerRef);

  @Input() field!: Field;
  @Input() form!: FormGroup;

  ngOnInit() {
    const component = mapper[this.field.type];

    const ref = this.vcr.createComponent(component);

    ref.instance.field = this.field as any;
    ref.instance.form = this.form;
  }
}
