import * as dynamoose from 'dynamoose'
import { baseSchema } from '@/infra/db/dynamoose/schema/base-schema'

export const todoSchema = new dynamoose.Schema({
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
