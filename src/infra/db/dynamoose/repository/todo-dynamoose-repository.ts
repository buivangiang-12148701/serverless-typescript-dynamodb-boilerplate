import { type CreateTodoRepository } from '@/data/protocols/db/todo'
import { type ModelType } from 'dynamoose/dist/General'

export class TodoDynamooseRepository implements CreateTodoRepository {
  constructor (private readonly Model: ModelType<any>) {
  }

  async add (params: CreateTodoRepository.Params): Promise<CreateTodoRepository.Result> {
    try {
      const todoModel = new this.Model(params)
      await todoModel.save()
      return true
    } catch (e) {
      return false
    }
  }
}
