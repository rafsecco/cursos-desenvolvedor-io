import { Injectable, signal, computed } from '@angular/core';
import { Task } from './task';

export interface State {
  todolist: Task[];
}

@Injectable({ providedIn: 'root' })
export class Store {
  private state = signal<State>({
    todolist: [],
  });

  // selectors
  todolist = computed(() => this.state().todolist);

  iniciadas = computed(() => this.todolist().filter((t) => t.iniciado && !t.finalizado));

  finalizadas = computed(() => this.todolist().filter((t) => t.finalizado));

  pendentes = computed(() => this.todolist().filter((t) => !t.iniciado && !t.finalizado));

  setTodolist(todolist: Task[]) {
    this.state.update((s) => ({
      ...s,
      todolist,
    }));
  }

  updateTask(task: Task) {
    this.state.update((s) => ({
      ...s,
      todolist: s.todolist.map((t) => (t.id === task.id ? task : t)),
    }));
  }

  addTask(task: Task) {
    this.state.update((s) => ({
      ...s,
      todolist: [...s.todolist, task],
    }));
  }

  removeTask(id: number) {
    this.state.update((s) => ({
      ...s,
      todolist: s.todolist.filter((t) => t.id !== id),
    }));
  }
}
