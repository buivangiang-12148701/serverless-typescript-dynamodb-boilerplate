import { makeDbAddTodo } from '@/main/factories/usecases/add-todo-factory'
import { CreateTodoController } from '@/presentation/controllers'
import { addTodoSchema } from '@/presentation/schemas'
import Validator from 'fastest-validator'

export const makeCreateTodoController = (): CreateTodoController => {
  const validator = new Validator()
  const dbAddTodo = makeDbAddTodo()
  return new CreateTodoController(dbAddTodo, validator, addTodoSchema)
}
