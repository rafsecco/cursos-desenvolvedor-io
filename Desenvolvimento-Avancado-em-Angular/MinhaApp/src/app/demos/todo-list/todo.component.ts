import { Component, inject, signal } from '@angular/core';
import { TasksFinalizadas } from './components/tasks-finalizadas/tasks-finalizadas';
import { TasksIniciadas } from './components/tasks-iniciadas/tasks-iniciadas';
import { Tasks } from './components/tasks/tasks';
import { TasksService } from './todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [Tasks, TasksIniciadas, TasksFinalizadas, FormsModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  private service = inject(TasksService);

  newTask = signal('');

  addTask() {
    const nome = this.newTask().trim();
    if (!nome) { return; }
    this.service.addTask(nome).subscribe(() => {
      this.newTask.set('');
    });
  }
}
