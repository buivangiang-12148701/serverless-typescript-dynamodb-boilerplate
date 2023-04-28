import { type AddTodo } from '@/domain/usecases'
import { TodoDynamooseRepository } from '@/infra/db'
import { DbAddTodo } from '@/data/usecases'

export const makeDbAddTodo = (): AddTodo => {
  const todoDynamooseRepository = new TodoDynamooseRepository()
  return new DbAddTodo(todoDynamooseRepository)
}
