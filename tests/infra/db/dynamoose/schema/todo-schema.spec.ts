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
  it('object should has the property "id" from baseSchema', () => {
    expect(todoSchema).toHaveProperty('id')
  })
  it('object should have the property "title", "description", "isCompleted"', async () => {
    expect(todoSchema).toHaveProperty('title')
    expect(todoSchema).toHaveProperty('description')
    expect(todoSchema).toHaveProperty('isCompleted')
  })
})
