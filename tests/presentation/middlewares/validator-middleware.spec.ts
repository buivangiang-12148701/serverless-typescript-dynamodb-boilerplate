import { mock, type MockProxy } from 'jest-mock-extended'
import { type Validator } from '@/presentation/validator'
import { ValidatorMiddleware } from '@/presentation/middlewares'
import { badRequest } from '@/presentation/helpers/http'
import { FastestValidatorError } from '@/presentation/errors'
import { faker } from '@faker-js/faker'

jest.mock('@/presentation/helpers/http', () => {
  return {
    badRequest: jest.fn()
  }
})
const createMockRequest = (body: any): any => ({
  event: { body },
  context: {},
  response: {},
  error: null
})

describe('ValidatorMiddleware', () => {
  let validatorSpy: MockProxy<Validator<Error[], boolean>>
  let request: any
  let badRequestSpy: jest.Mock
  let sut: ValidatorMiddleware
  beforeEach(() => {
    request = createMockRequest({})
    validatorSpy = mock()
    badRequestSpy = jest.fn()
    jest.mocked(badRequest).mockImplementation(badRequestSpy)
    sut = new ValidatorMiddleware(validatorSpy)
  })
  it('should call the validator and resolve with no errors', async () => {
    validatorSpy.validate.mockResolvedValue(true)
    await expect(sut.before(request)).resolves.toBeUndefined()
  })

  it('should call the validator and reject with an array of errors', async () => {
    const errors = [new Error('Error 1'), new Error('Error 2')]
    validatorSpy.validate.mockResolvedValue(errors)
    const promise = sut.before(request)
    await expect(promise).rejects.toEqual(errors)
  })

  it('should returns badRequest function if validator throws an error', async () => {
    const error = new Error('Error')
    validatorSpy.validate.mockRejectedValue(error)
    await sut.before((request))
    expect(badRequestSpy).toHaveBeenCalledTimes(1)
  })

  it('should handle onError when request error is an array of FastestValidatorError', async () => {
    const errors = [
      new FastestValidatorError({
        message: faker.lorem.words(5),
        type: 'string',
        field: faker.lorem.words(5)
      })
    ]

    request.error = errors as unknown as Error

    await sut.onError(request)

    expect(badRequestSpy).toHaveBeenCalledTimes(1)
  })

  it('should resolve when onError is called with a non-array error', async () => {
    request.error = null

    await expect(sut.onError(request)).resolves.toBeUndefined()
  })

  it('should resolve when onError is called with a array error not instance of FastestValidatorErrorImpl', async () => {
    request.error = [
      new Error('Error 1'),
      new Error('Error 2')
    ]

    await expect(sut.onError(request)).resolves.toBeUndefined()
  })
})
