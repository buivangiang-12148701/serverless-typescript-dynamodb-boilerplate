import { mock, type MockProxy } from 'jest-mock-extended'
import { type Validator } from '@/presentation/validator'
import { ValidatorMiddleware } from '@/presentation/middlewares'

jest.mock('@/presentation/validator')

const createMockRequest = (body: any): any => ({
  event: { body },
  context: {},
  response: {},
  error: null
})

describe('ValidatorMiddleware', () => {
  let validatorSpy: MockProxy<Validator<Error[], boolean>>
  let request: any
  let sut: ValidatorMiddleware
  beforeEach(() => {
    request = createMockRequest({})
    validatorSpy = mock()
    validatorSpy.validate.mockResolvedValue(true)
    sut = new ValidatorMiddleware(validatorSpy)
  })
  it('should call the validator and resolve with no errors', async () => {
    await expect(sut.before(request)).resolves.toBeUndefined()
  })

  it('should call the validator and reject with an array of errors', async () => {
    const errors = [new Error('Error 1'), new Error('Error 2')]

    validatorSpy.validate.mockResolvedValue(errors)
    await expect(sut.before(request)).rejects.toEqual(errors)
  })
})
