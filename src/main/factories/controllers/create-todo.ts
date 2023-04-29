import { makeDbAddTodo } from '@/main/factories/usecases/add-todo-factory'
import { CreateTodoController } from '@/presentation/controllers'
import { makeCreateTodoValidatorMiddleware } from '@/main/factories/middlewares/validator-middleware'

export const makeCreateTodoController = (): CreateTodoController => {
  const dbAddTodo = makeDbAddTodo()
  const validatorMiddleware = makeCreateTodoValidatorMiddleware()
  return new CreateTodoController(dbAddTodo, validatorMiddleware)
}
