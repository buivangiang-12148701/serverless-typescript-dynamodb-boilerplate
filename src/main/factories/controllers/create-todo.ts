import { makeDbAddTodo } from '@/main/factories/usecases/add-todo-factory'
import { CreateTodoController } from '@/presentation/controllers'

export const makeCreateTodoController = (): CreateTodoController => {
  const dbAddTodo = makeDbAddTodo()
  return new CreateTodoController(dbAddTodo)
}
