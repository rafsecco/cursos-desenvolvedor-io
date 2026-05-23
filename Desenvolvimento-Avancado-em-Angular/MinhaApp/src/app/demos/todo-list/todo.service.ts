import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

import { Task } from './task';
import { Store } from './todo.store';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(Store);

  private readonly apiUrl = 'http://localhost:3000/todolist';

  loadTasks() {
    return this.http.get<Task[]>(this.apiUrl).pipe(tap((tasks) => this.store.setTodolist(tasks)));
  }

  toggle(task: Task) {
    return this.http
      .put<Task>(`${this.apiUrl}/${task.id}`, task)
      .pipe(tap((updated) => this.store.updateTask(updated)));
  }

  addTask(nome: string) {
    const nextId = Math.max(0, ...this.store.todolist().map((t) => Number(t.id))) + 1;
    const newTask: Task = {
      id: nextId,
      nome,
      iniciado: false,
      finalizado: false,
    };

    console.log('Adding task (id):', newTask.id);
    console.log('Adding task:', newTask);

    return this.http
      .post<Task>(this.apiUrl, newTask)
      .pipe(tap((created) => this.store.addTask(created)));
  }

  removeTask(id: number) {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.store.removeTask(id)));
  }
}
