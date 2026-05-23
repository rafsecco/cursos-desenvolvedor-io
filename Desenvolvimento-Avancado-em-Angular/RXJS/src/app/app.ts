import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Hello, {{ title() }}</h1>

    <router-outlet />
  `,
  styles: [],
})
export class App implements OnInit {

  protected readonly title = signal('RXJS');

  minhaPromise(nome: string) : Promise<string>{
    return new Promise((resolve, reject) => {
      if(nome === 'Rafael'){
        setTimeout(() => {
          resolve('Seja bem vindo ' + nome);
        }, 1000);
      } else {
        reject('Ops! Você não é o Rafael');
      }
    });
  }

  minhaObservable(nome: string) : Observable<string>{
    return new Observable(subscriber => {
      if(nome === 'Rafael'){
        subscriber.next('Olá ' + nome);
        subscriber.next('Olá de novo! ' + nome);
        setTimeout(() => {
          subscriber.next('Resposta com delay ' + nome);
        }, 5000);
        subscriber.complete();
      } else {
        subscriber.error('Ops! Deu erro!');
      }
    });
  }

  usuarioObservable(nome: string, email: string) : Observable<Usuario>{
    return new Observable(subscriber => {
      if(nome === 'Admin') {
        let usuario = new Usuario(nome, email);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 1000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 2000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 3000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 4000);

        setTimeout(() => {
          subscriber.complete();
        }, 5000);
      } else {
        subscriber.error('Ops! Deu erro!');
      }
    });
  }

  ngOnInit(): void {
    this.minhaPromise('Rafael')
      .then(result => console.log(result))

    this.minhaPromise('Jose')
      .then(result => console.log(result))
      .catch(error => console.error(error));

    this.minhaObservable('Rafael')
      .subscribe({
        next: result => console.log(result),
        error: erro => console.log(erro)
      });

    const observer = {
      next: (valor: string) => this.escrever('Next: ' + valor),
      error: (erro: string) => console.log('Error: ', erro),
      complete: () => console.log('FIM!')
    }
    const minhaObs = this.minhaObservable('Rafael');
      minhaObs.subscribe(observer);

    const userObserver : Observer<Usuario> = {
      next: valor => console.log('Next: ', valor),
      error: erro => console.log('Error: ', erro),
      complete: () => console.log('Observable completa!')
    }

    const userObs = this.usuarioObservable('Admin', 'admin@admin.com');
    const subs = userObs.subscribe(userObserver);

    setTimeout(() => {
      subs.unsubscribe();
      console.log('Unsubscribed!');
      console.log('Conexão fechada: ', subs.closed);
    }, 3500);
  }

  escrever(texto: string) {
    console.log(texto);
  }
}

export class Usuario {
  constructor(public nome: string, public email: string) {}
}
