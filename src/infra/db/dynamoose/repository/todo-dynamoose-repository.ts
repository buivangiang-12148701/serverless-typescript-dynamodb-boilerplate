import { TodoModel } from '@/infra/db/dynamoose/models'
import { type AddTodoRepository } from '@/data/protocols/db/todo'

export class TodoDynamooseRepository implements AddTodoRepository {
  async add (params: AddTodoRepository.Params): Promise<AddTodoRepository.Result> {
    try {
      const todoModel = new TodoModel(params)
      await todoModel.save()
      return true
    } catch (e) {
      return false
    }
  }
}
