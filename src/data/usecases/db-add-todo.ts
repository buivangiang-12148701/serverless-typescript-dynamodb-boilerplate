import { type AddTodo } from '@/domain/usecases'
import { type AddTodoRepository } from '@/data/protocols/db/todo'

export class DbAddTodo implements AddTodo {
  constructor (private readonly addTodoRepository: AddTodoRepository) {}
  async add (params: AddTodo.Params): Promise<AddTodo.Result> {
    await this.addTodoRepository.add(params)
    return true
  }
}
