import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from './generic-form-validation';

describe('GenericValidator', () => {
  const validationMessages = {
    email: {
      required: 'E-mail é obrigatório.',
      email: 'E-mail inválido.',
    },
    senha: {
      required: 'Senha é obrigatória.',
    },
  };

  let validator: GenericValidator;
  let form: FormGroup;

  beforeEach(() => {
    validator = new GenericValidator(validationMessages);
    form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
    });
  });

  it('deve retornar string vazia quando o campo está pristine', () => {
    const messages = validator.processarMensagens(form);
    expect(messages['email']).toBe('');
    expect(messages['senha']).toBe('');
  });

  it('deve retornar mensagem de obrigatório quando campo está tocado e vazio', () => {
    form.get('email')!.markAsTouched();
    const messages = validator.processarMensagens(form);
    expect(messages['email']).toContain('E-mail é obrigatório.');
  });

  it('deve retornar mensagem de email inválido quando valor não é um email', () => {
    form.get('email')!.setValue('nao-e-email');
    form.get('email')!.markAsTouched();
    const messages = validator.processarMensagens(form);
    expect(messages['email']).toContain('E-mail inválido.');
  });

  it('deve retornar string vazia quando o campo é válido', () => {
    form.get('email')!.setValue('valido@email.com');
    form.get('email')!.markAsTouched();
    const messages = validator.processarMensagens(form);
    expect(messages['email']).toBe('');
  });

  it('deve ignorar controles sem mensagens configuradas', () => {
    const formComExtra = new FormGroup({
      email: new FormControl('', Validators.required),
      campoSemMensagem: new FormControl(''),
    });
    const messages = validator.processarMensagens(formComExtra);
    expect(messages['campoSemMensagem']).toBeUndefined();
  });

  it('deve processar FormGroup aninhado recursivamente', () => {
    const formAninhado = new FormGroup({
      endereco: new FormGroup({
        email: new FormControl('', Validators.required),
      }),
    });
    formAninhado.get('endereco.email')!.markAsTouched();
    const messages = validator.processarMensagens(formAninhado);
    expect(messages['email']).toContain('E-mail é obrigatório.');
  });

  it('deve retornar mensagem de senha obrigatória quando campo está sujo', () => {
    form.get('senha')!.markAsDirty();
    const messages = validator.processarMensagens(form);
    expect(messages['senha']).toContain('Senha é obrigatória.');
  });
});
