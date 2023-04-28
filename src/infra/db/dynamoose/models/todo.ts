import * as dynamoose from 'dynamoose'
import { Env } from '@/main/config'
import { Base, baseSchema } from '@/infra/db/dynamoose/models/base'

export class TodoEntity extends Base {
  title!: string
  description!: string
}

export const tableName = Env.DYNAMODB_TABLE_TODO

const todoSchema = new dynamoose.Schema({
  ...baseSchema,
  ...{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: false,
  saveUnknown: false
})

export const TodoModel = dynamoose.model<TodoEntity>('TodoModel', todoSchema, { tableName })
