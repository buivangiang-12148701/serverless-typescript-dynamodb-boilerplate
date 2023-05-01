import { type CreateTodo } from '@/domain/usecases'
import { type CreateTodoRepository } from '@/data/protocols/db/todo'

export class DbCreateTodo implements CreateTodo {
  constructor (private readonly createTodoRepository: CreateTodoRepository) {}
  async add (params: CreateTodo.Params): Promise<CreateTodo.Result> {
    return this.createTodoRepository.add(params)
  }
}
