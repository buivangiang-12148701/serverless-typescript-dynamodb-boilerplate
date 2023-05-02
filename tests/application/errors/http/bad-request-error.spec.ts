import { type ValidationError } from 'fastest-validator'
import { BadRequestError } from '@/application/errors'

describe('BadRequestError', () => {
  it('should create a default BadRequestError instance', () => {
    const error = new BadRequestError({})
    expect(error.name).toBe('BadRequestError')
    expect(error.message).toBe('Validation errors in your request')
  })

  it('should create a BadRequestError instance with a custom message', () => {
    const customMessage = 'Custom error message'
    const error = new BadRequestError({ message: customMessage })
    expect(error.name).toBe('BadRequestError')
    expect(error.message).toBe(customMessage)
  })

  it('should create a BadRequestError instance with validation errors', () => {
    const validationErrors: ValidationError[] = [
      {
        type: 'required',
        field: 'username',
        message: 'The "username" field is required'
      }
    ]
    const error = new BadRequestError({ errors: validationErrors })
    expect(error.name).toBe('BadRequestError')
    expect(error.message).toBe('Validation errors in your request')
  })

  it('should return a JSON string representation of the error', () => {
    const customMessage = 'Custom error message'
    const validationErrors: ValidationError[] = [
      {
        type: 'required',
        field: 'username',
        message: 'The "username" field is required'
      }
    ]
    const error = new BadRequestError({
      message: customMessage,
      errors: validationErrors
    })

    const expectedJsonString = JSON.stringify({
      message: customMessage,
      error: validationErrors
    })

    expect(error.toString()).toBe(expectedJsonString)
  })
})
