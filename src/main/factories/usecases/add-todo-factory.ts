import { type CreateTodo } from '@/domain/usecases'
import { TodoDynamooseRepository, TodoModel } from '@/infra/db'
import { DbCreateTodo } from '@/data/usecases'

export const makeDbCreateTodo = (): CreateTodo => {
  const todoDynamooseRepository = new TodoDynamooseRepository(TodoModel)
  return new DbCreateTodo(todoDynamooseRepository)
}
