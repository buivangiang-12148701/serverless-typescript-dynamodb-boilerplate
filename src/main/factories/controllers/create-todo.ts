import { CreateTodoHandle } from '@/presentation/handler'
import { makeDbAddTodo } from '@/main/factories/usecases/add-todo-factory'

export const makeCreateTodoHandler = (): CreateTodoHandle => {
  const dbAddTodo = makeDbAddTodo()
  return new CreateTodoHandle(dbAddTodo)
}
