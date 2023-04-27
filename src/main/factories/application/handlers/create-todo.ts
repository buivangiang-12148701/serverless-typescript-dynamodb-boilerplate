import { CreateTodoHandle } from '@/application/handler'

export const makeCreateTodoHandler = (): CreateTodoHandle => {
  return new CreateTodoHandle()
}
