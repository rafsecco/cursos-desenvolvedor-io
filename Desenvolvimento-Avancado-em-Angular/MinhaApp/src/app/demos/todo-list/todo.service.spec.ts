import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { firstValueFrom, of } from 'rxjs';

import { Task } from './task';
import { TasksService } from './todo.service';
import { Store } from './todo.store';

const todolist: Task[] = [
  {
    id: 1,
    nome: 'Responder e-mails',
    finalizado: true,
    iniciado: false,
  },
];

class MockHttpClient {
  get = vi.fn().mockReturnValue(of(todolist));

  put = vi.fn();

  post = vi.fn();

  delete = vi.fn();
}

describe('TasksService', () => {
  let service: TasksService;
  let store: Store;
  let http: MockHttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TasksService,
        Store,
        {
          provide: HttpClient,
          useClass: MockHttpClient,
        },
      ],
    });

    service = TestBed.inject(TasksService);

    store = TestBed.inject(Store);

    http = TestBed.inject(HttpClient) as unknown as MockHttpClient;
  });

  it('deve carregar lista de tarefas', async () => {
    const result = await firstValueFrom(service.loadTasks());

    expect(http.get).toHaveBeenCalledOnce();

    expect(result).toEqual(todolist);

    expect(store.todolist()).toEqual(todolist);
  });
});
