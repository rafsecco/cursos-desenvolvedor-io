import { Component, inject } from '@angular/core';
import { Store } from '../../todo.store';
import { TasksService } from '../../todo.service';
import { TodoList } from '../todo-list/todo-list';

@Component({
  selector: 'app-tasks-iniciadas',
  standalone: true,
  imports: [TodoList],
  templateUrl: './tasks-iniciadas.html',
})
export class TasksIniciadas {
  private store = inject(Store);
  private service = inject(TasksService);

  iniciadas = this.store.iniciadas;

  onToggle(event: any) {
    this.service.toggle(event.task);
  }
}
