import { baseSchema, Base } from '@/infra/db'
import * as dynamoose from 'dynamoose'

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
class TestBase extends Base {}

describe('Base class', () => {
  it('should extends schema from base schema', async () => {
    const baseSchemaSpy = new dynamoose.Schema({
      ...baseSchema,
      ...{
      }
    })
    dynamoose.model<TestBase>('TestBase', baseSchemaSpy)
    expect(baseSchemaSpy).toEqual(baseSchema)
  })
})
