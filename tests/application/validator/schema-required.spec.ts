import { SchemaRequired, type Validator } from '@/application/validator'
import { mock, type MockProxy } from 'jest-mock-extended'
import { type SchemaFastestValidatorAdapter } from '@/infra/validator'

describe('SchemaRequired', () => {
  let serviceSpy: MockProxy<SchemaFastestValidatorAdapter>
  let schemaRequired: object
  let sut: Validator<Error[], boolean>

  beforeEach(() => {
    schemaRequired = {
      name: { type: 'string', min: 3, max: 255, empty: false },
      age: { type: 'number', min: 18, max: 100, integer: true }
    }
    serviceSpy = mock()
    serviceSpy.validate.mockResolvedValue(true)
    sut = new SchemaRequired(serviceSpy, schemaRequired)
  })

  it('should return true for valid input', async () => {
    const input = { name: 'John Doe', age: 30 }

    const result = await sut.validate(input)

    expect(result).toBeTruthy()
  })

  it('should return an array of errors for invalid input', async () => {
    serviceSpy.validate.mockResolvedValue([])

    const input = { name: 'Jo', age: 17 }

    const result = await sut.validate(input)

    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(0)
  })

  it('should return an array of errors for missing fields', async () => {
    serviceSpy.validate.mockResolvedValue([])

    const input = {}

    const result = await sut.validate(input)

    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(0)
  })
})
