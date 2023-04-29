import { CreateTodoController } from '@/presentation/controllers'
import { makeCreateTodoValidatorMiddleware, makeDbCreateTodo } from '@/main/factories'

export const makeCreateTodoController = (): CreateTodoController => {
  const dbCreateTodo = makeDbCreateTodo()
  const validatorMiddleware = makeCreateTodoValidatorMiddleware()
  return new CreateTodoController(dbCreateTodo, validatorMiddleware)
}
