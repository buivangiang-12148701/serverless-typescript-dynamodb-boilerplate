import { type Context } from 'aws-lambda'
import { type CreateTodoDto } from '../../dto/todos/create-todo-dto'

export interface ContextTodo extends Context {
  todo: CreateTodoDto
}
