import * as dynamoose from 'dynamoose'
import { Base } from '@/infra/db/dynamoose/models'
import { todoSchema } from '@/infra/db/dynamoose/schema/todo-schema'

export class TodoEntity extends Base {
  title!: string
  description!: string
}

export const TodoModel = dynamoose.model<TodoEntity>('TodoModel', todoSchema)
