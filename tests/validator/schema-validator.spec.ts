import { type SchemaValidator } from '@/validator'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('SchemaValidator', () => {
  let params: SchemaValidator.Params
  let sut: MockProxy<SchemaValidator>

  beforeEach(() => {
    params = {
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          }
        },
        required: ['name']
      },
      value: {
        name: 'any_name'
      }
    }
    sut = mock()
  })

  it('should call method add with correct parameters', async () => {
    await sut.validate(params)
    expect(sut.validate).toBeCalledWith(params)
    expect(sut.validate).toBeCalledTimes(1)
  })
})
