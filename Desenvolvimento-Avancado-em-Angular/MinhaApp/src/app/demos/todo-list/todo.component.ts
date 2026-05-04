import { Component } from '@angular/core';
import { TasksFinalizadas } from './components/tasks-finalizadas/tasks-finalizadas';
import { TasksIniciadas } from './components/tasks-iniciadas/tasks-iniciadas';
import { Tasks } from './components/tasks/tasks';

@Component({
  selector: 'app-todo-list',
  imports: [Tasks, TasksIniciadas, TasksFinalizadas],
  templateUrl: './todo.component.html',
})
export class TodoComponent {}
