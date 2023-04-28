import { TodoModel } from '@/infra/db/dynamoose/models'
import { type AddTodoRepository } from '@/data/protocols/db/todo'

export class TodoDynamooseRepository implements AddTodoRepository {
  async add (params: AddTodoRepository.Params): Promise<AddTodoRepository.Result> {
    await TodoModel.create(params)
    return true
  }
}
