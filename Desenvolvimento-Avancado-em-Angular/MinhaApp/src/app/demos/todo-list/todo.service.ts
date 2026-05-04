import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

import { Task } from './task';
import { Store } from './todo.store';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private http = inject(HttpClient);
  private store = inject(Store);

  loadTasks() {
    return this.http
      .get<Task[]>('http://localhost:3000/todolist')
      .pipe(tap((tasks) => this.store.setTodolist(tasks)));
  }

  toggle(task: Task) {
    this.http
      .put<Task>(`http://localhost:3000/todolist/${task.id}`, task)
      .subscribe((updated) => {
        this.store.updateTask(updated);
      });
  }
}
