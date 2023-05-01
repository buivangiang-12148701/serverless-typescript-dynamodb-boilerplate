import { type ModelTableOptions } from 'dynamoose/dist/Model'
import { Env } from '@/main/config'

// define options should not create table if not exist because serverless framework will create it
export const todoTableOptions: ModelTableOptions = {
  tableName: Env.getInstance().getEnv().DYNAMODB_TABLE_TODO,
  create: false,
  waitForActive: {
    enabled: false
  }
}
