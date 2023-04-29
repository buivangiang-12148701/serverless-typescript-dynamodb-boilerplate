import * as dynamoose from 'dynamoose'
import { Env } from '@/main/config'
import { Base, baseSchema } from '@/infra/db/dynamoose/models/base'
import { type ModelTableOptions } from 'dynamoose/dist/Model'

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

// define options should not create table if not exist because serverless framework will create it
const modelTableOptions: ModelTableOptions = {
  tableName,
  create: false,
  waitForActive: {
    enabled: false
  }
}
export const TodoModel = dynamoose.model<TodoEntity>('TodoModel', todoSchema, modelTableOptions)
