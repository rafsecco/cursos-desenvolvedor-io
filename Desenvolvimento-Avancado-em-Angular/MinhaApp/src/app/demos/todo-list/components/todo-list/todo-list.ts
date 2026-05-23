import { Component, Input, Output, EventEmitter, input, output } from '@angular/core';
import { Task } from '../../task';

type Acao =
  | 'iniciar'
  | 'finalizar'
  | 'retomar'
  | 'cancelar';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.css'],
})
export class TodoList {
  list = input.required<Task[]>();

  toggle = output<{ task: Task }>();

  remove = output<{ id: number }>();

  toggleItem(index: number, acao: Acao): void {

    const currentTask = this.list()[index];

    if (!currentTask) return;

    const task: Task = { ...currentTask };

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

  removeItem(taskId: number) {
    this.remove.emit({ id: taskId });
  }
}
