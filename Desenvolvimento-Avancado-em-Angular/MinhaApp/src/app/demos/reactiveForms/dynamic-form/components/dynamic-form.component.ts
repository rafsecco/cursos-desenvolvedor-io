import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormBuilderService } from '../services/form-builder.service';
import { Field } from '../models/question.model';
import { DynamicFieldDirective } from '../dynamic-field.directive';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicFieldDirective],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit {
  form!: FormGroup;
  fields: Field[] = [];

  constructor(private fbService: FormBuilderService) {}

  ngOnInit() {
    // Simulando a estrutura do Google Forms com JSON de campos
    this.fields = [
      { type: 'textbox', key: 'nome', label: 'Nome', required: true, autocomplete: 'nome' },
      { type: 'textbox', key: 'sobrenome', label: 'Sobrenome', required: true, autocomplete: 'sobrenome' },
      { type: 'textbox', key: 'email', label: 'Email', inputType: 'email', autocomplete: 'email' },
      { type: 'textbox', key: 'instagram', label: 'Instagram', inputType: 'text', autocomplete: 'instagram' },
      { type: 'textbox', key: 'senha', label: 'Senha', inputType: 'password', autocomplete: 'senha' },
      {
        type: 'dropdown',
        key: 'tipo',
        label: 'Tipo',
        options: [
          { key: '1', value: 'Cliente' },
          { key: '2', value: 'Fornecedor' },
        ],
      },
    ];

    // Gerando o FormGroup com base nos campos
    this.form = this.fbService.buildForm(this.fields);
  }

  submit() {
    console.log(this.form.value);
  }
}
