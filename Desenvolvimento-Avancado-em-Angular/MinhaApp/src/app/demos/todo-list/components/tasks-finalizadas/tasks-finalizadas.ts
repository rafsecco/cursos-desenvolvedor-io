import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store } from '../../todo.store';
import { TasksService } from '../../todo.service';
import { TodoList } from '../todo-list/todo-list';
import { Task } from '../../task';

@Component({
  selector: 'app-tasks-finalizadas',
  standalone: true,
  imports: [TodoList],
  templateUrl: './tasks-finalizadas.html',
})
export class TasksFinalizadas {
  private readonly store = inject(Store);
  private readonly service = inject(TasksService);
  private readonly destroyRef = inject(DestroyRef);
  finalizados = this.store.finalizadas;

  onToggle(event: { task: Task }): void {
    this.service.toggle(event.task).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  removeTask(event: { id: number }): void {
    this.service.removeTask(event.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
