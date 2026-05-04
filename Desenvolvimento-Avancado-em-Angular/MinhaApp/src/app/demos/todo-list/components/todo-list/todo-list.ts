import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../task';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.css'],
})
export class TodoList {
  @Input({ required: true })
  list!: Task[];

  @Output()
  toggle = new EventEmitter<{ task: Task }>();

  toggleItem(index: number, acao: string) {
    const task = { ...this.list[index] };

    console.log('Toggling task:', task, 'Action:', acao);

    switch (acao) {
      case 'iniciar':
        task.iniciado = true;
        task.finalizado = false;
        break;
      case 'finalizar':
        task.iniciado = false;
        task.finalizado = true;
        break;
      case 'retomar':
        task.iniciado = true;
        task.finalizado = false;
        break;
      case 'cancelar':
        task.iniciado = false;
        task.finalizado = false;
        break;
    }

    this.toggle.emit({ task });
  }
}
