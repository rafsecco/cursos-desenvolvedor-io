import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly service = inject(TasksService);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  todolist = this.store.pendentes;

  constructor() {
    this.service.loadTasks().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  onToggle(event: { task: import('../../task').Task }): void {
    this.service.toggle(event.task).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  removeTask(event: { id: number }): void {
    this.service.removeTask(event.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
