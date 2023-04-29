import { CreateTodoController } from '@/presentation/controllers'
import { makeDbAddTodo, makeCreateTodoValidatorMiddleware } from '@/main/factories'

export const makeCreateTodoController = (): CreateTodoController => {
  const dbAddTodo = makeDbAddTodo()
  const validatorMiddleware = makeCreateTodoValidatorMiddleware()
  return new CreateTodoController(dbAddTodo, validatorMiddleware)
}
