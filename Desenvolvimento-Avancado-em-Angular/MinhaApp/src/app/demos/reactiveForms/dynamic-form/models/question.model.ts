export type FieldType = 'textbox' | 'dropdown';

interface BaseField {
  key: string;
  label: string;
  required?: boolean;
}

export interface TextboxField extends BaseField {
  type: 'textbox';
  inputType?: 'text' | 'email' | 'password';
  autocomplete?: string;
}

export interface DropdownField extends BaseField {
  type: 'dropdown';
  options: { key: string; value: string }[];
}

export type Field = TextboxField | DropdownField;
