import { TodoModel } from '@/infra/db'

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
jest.mock('@/infra/db/dynamoose/schema/todo-schema', () => {
  return {
    todoSchema: {
      id: {
        type: String
      },
      title: {
        type: String
      }
    }
  }
})

describe('Todo Model', () => {
  it('should return a todo model and have todoSchema', () => {
    const str = JSON.stringify(TodoModel)
    expect(str).toMatch('id')
    expect(str).toMatch('title')
  })
})
