import { type CreateTodo } from '@/domain/usecases'
import { TodoDynamooseRepository } from '@/infra/db'
import { DbCreateTodo } from '@/data/usecases'

export const makeDbCreateTodo = (): CreateTodo => {
  const todoDynamooseRepository = new TodoDynamooseRepository()
  return new DbCreateTodo(todoDynamooseRepository)
}
