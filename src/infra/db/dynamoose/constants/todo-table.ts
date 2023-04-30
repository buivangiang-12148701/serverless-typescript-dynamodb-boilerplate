import { Env } from '@/main/config'
import { type ModelTableOptions } from 'dynamoose/dist/Model'

// define options should not create table if not exist because serverless framework will create it
export const todoTableOptions: ModelTableOptions & any = {
  tableName: Env.getInstance().getEnv().DYNAMODB_TABLE_TODO,
  create: false,
  waitForActive: {
    enabled: false
  }
}
