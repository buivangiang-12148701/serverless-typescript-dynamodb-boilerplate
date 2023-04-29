import { TodoModel } from '@/infra/db/dynamoose/models'
import { type CreateTodoRepository } from '@/data/protocols/db/todo'

export class TodoDynamooseRepository implements CreateTodoRepository {
  async add (params: CreateTodoRepository.Params): Promise<CreateTodoRepository.Result> {
    try {
      const todoModel = new TodoModel(params)
      await todoModel.save()
      return true
    } catch (e) {
      return false
    }
  }
}
