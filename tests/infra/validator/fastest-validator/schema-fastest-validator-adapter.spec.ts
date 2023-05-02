import { mock, type MockProxy } from 'jest-mock-extended'
import { type SchemaValidator } from '@/validator'
import { faker } from '@faker-js/faker'
import { SchemaFastestValidatorAdapter } from '@/infra/validator'
import type Validator from 'fastest-validator'
import { type CheckFunctionOptions, type ValidationError } from 'fastest-validator'
import { type FastestValidatorError } from '@/application/errors'

describe('SchemaFastestValidatorAdapter', () => {
  let validator: MockProxy<Validator>
  let params: SchemaValidator.Params
  let validationError: MockProxy<ValidationError>
  let asyncCheckFunction: any
  let mockError: Error
  let sut: SchemaValidator

  beforeEach(() => {
    params = {
      schema: faker.science.chemicalElement(),
      value: faker.science.chemicalElement()
    }
    mockError = new Error(faker.lorem.sentence())
    validationError = mock()
    validationError.message = faker.lorem.sentence()
    validationError.field = faker.lorem.word()
    validationError.type = faker.lorem.word()
    asyncCheckFunction = jest.fn(async (_value: any, _opts?: CheckFunctionOptions) => {
      return Promise.resolve(true)
    })
    validator = mock()
    validator.compile.calledWith(params.schema).mockReturnValue(asyncCheckFunction)
    sut = new SchemaFastestValidatorAdapter(validator)
  })

  it('should call `compile` with correct params', async () => {
    await sut.validate(params)

    expect(validator.compile).toBeCalledWith(params.schema)
    expect(validator.compile).toBeCalledTimes(1)
  })

  it('should call `check` with correct params', async () => {
    await sut.validate(params)

    expect(asyncCheckFunction).toBeCalledWith(params.value)
    expect(asyncCheckFunction).toBeCalledTimes(1)
  })

  it('should return true if `check` returns true', async () => {
    const result = await sut.validate(params)

    expect(result).toBe(true)
  })
  it('should return errors if `check` returns errors', async () => {
    asyncCheckFunction = jest.fn((_value: any, _opts?: CheckFunctionOptions) => {
      return [validationError]
    })
    validator.compile.calledWith(params.schema).mockReturnValue(asyncCheckFunction)
    const result = await sut.validate(params)

    expect(result).toBeInstanceOf(Array<FastestValidatorError>)
  })

  it('should call private method transformNormalizedError if `check` returns errors', async () => {
    const transformNormalizedErrorSpy = jest.spyOn(SchemaFastestValidatorAdapter.prototype as any, 'transformNormalizedError')
    asyncCheckFunction = jest.fn((_value: any, _opts?: CheckFunctionOptions) => {
      return [validationError]
    })
    validator.compile.calledWith(params.schema).mockReturnValue(asyncCheckFunction)

    const result = await sut.validate(params)

    expect(transformNormalizedErrorSpy).toBeCalledTimes(1)
    expect(result).toBeInstanceOf(Array<FastestValidatorError>)
  })
  it('should rethrows if `check` throws', async () => {
    asyncCheckFunction = jest.fn((_value: any, _opts?: CheckFunctionOptions) => {
      throw mockError
    })
    validator.compile.calledWith(params.schema).mockReturnValue(asyncCheckFunction)

    const promise = sut.validate(params)

    await expect(promise).rejects.toThrow(mockError)
  })
})
