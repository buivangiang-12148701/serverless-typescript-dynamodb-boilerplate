import { TodoDynamooseRepository } from '@/infra/db'
import * as dynamoose from 'dynamoose'
import { type CreateTodoRepository } from '@/data/protocols'
import { faker } from '@faker-js/faker'

jest.mock('dynamoose', () => {
  const Schema = jest.fn((schema) => {
    return schema
  })

  // Mock the model function
  const model = jest.fn()

  return {
    Schema,
    model
  }
})

describe('TodoDynamooseRepository', () => {
  let sut: TodoDynamooseRepository
  let params: CreateTodoRepository.Params
  let mockModel: jest.Mock

  beforeEach(() => {
    params = {
      title: faker.lorem.words(5),
      description: faker.lorem.words(10)
    }
    mockModel = jest.fn()
    jest.mocked(dynamoose.model).mockImplementation(mockModel)
    sut = new TodoDynamooseRepository(mockModel)
  })

  it('should returns true if create an todo successfully', async () => {
    mockModel.mockImplementation((model: any) => {
      return {
        model,
        save: jest.fn().mockReturnValue(params),
        get: jest.fn()
      }
    })
    const result = await sut.add(params)
    expect(result).toBeTruthy()
  })

  it('should returns false if create an todo failed', async () => {
    mockModel.mockImplementation((model: any) => {
      return {
        model,
        save: jest.fn().mockRejectedValue(new Error('any_error')),
        get: jest.fn()
      }
    })
    const result = await sut.add(params)
    expect(result).toBeFalsy()
  })
})
