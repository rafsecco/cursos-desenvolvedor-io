import { Component, effect, inject } from '@angular/core';
import { TasksService } from '../../todo.service';
import { Store } from '../../todo.store';
import { TodoList } from '../todo-list/todo-list';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TodoList],
  templateUrl: './tasks.html',
})
export class Tasks {
  private service = inject(TasksService);
  private store = inject(Store);

  todolist = this.store.pendentes;

  constructor() {
    effect(() => {
      this.service.loadTasks().subscribe();
    });
  }

  onToggle(event: any) {
    this.service.toggle(event.task);
  }
}
