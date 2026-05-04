import { Component, inject } from '@angular/core';
import { Store } from '../../todo.store';
import { TasksService } from '../../todo.service';
import { TodoList } from '../todo-list/todo-list';

@Component({
  selector: 'app-tasks-finalizadas',
  standalone: true,
  imports: [TodoList],
  templateUrl: './tasks-finalizadas.html',
})
export class TasksFinalizadas {
  private store = inject(Store);
  private service = inject(TasksService);

  finalizados = this.store.finalizadas;

  onToggle(event: any) {
    this.service.toggle(event.task);
  }
}
