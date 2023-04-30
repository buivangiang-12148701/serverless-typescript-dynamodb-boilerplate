import { todoSchema } from '@/infra/db/dynamoose/schema/todo-schema'

jest.mock('dynamoose', () => {
  const Schema = jest.fn((schema) => {
    return schema
  })

  // Mock the model function
  const model = jest.fn((modelName, schema) => {
    return {
      modelName,
      schema,
      save: jest.fn(),
      get: jest.fn()
    }
  })

  return {
    Schema,
    model
  }
})
jest.mock('@/infra/db/dynamoose/schema/base-schema', () => {
  return {
    baseSchema: {
      id: {
        type: String
      }
    }
  }
})

describe('TodoSchema', () => {
  it('should return a todo schema and extends from base schema', () => {
    expect(todoSchema).toHaveProperty('id')
  })
})
