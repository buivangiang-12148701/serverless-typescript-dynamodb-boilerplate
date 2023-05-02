import { type BuiltInMessages } from 'fastest-validator'
import { FastestValidatorError } from '@/application/errors'

describe('FastestValidatorError', () => {
  // Test constructor
  it('should create an instance of FastestValidatorError with the given parameters', () => {
    const params = {
      field: 'username',
      type: 'required' as keyof BuiltInMessages,
      message: 'The "username" field is required.'
    }

    const error = new FastestValidatorError(params)

    expect(error).toBeInstanceOf(FastestValidatorError)
    expect(error.field).toEqual(params.field)
    expect(error.type).toEqual(params.type)
    expect(error.message).toEqual(params.message)
  })

  it('should create an instance with default message if not provided', () => {
    const params = {
      field: 'username',
      type: 'required' as keyof BuiltInMessages
    }

    const error = new FastestValidatorError(params)

    expect(error).toBeInstanceOf(FastestValidatorError)
    expect(error.field).toEqual(params.field)
    expect(error.type).toEqual(params.type)
    expect(error.message).toEqual('')
  })

  // Test toJSON method
  it('should return a JSON representation of the error', () => {
    const params = {
      field: 'username',
      type: 'required' as keyof BuiltInMessages,
      message: 'The "username" field is required.'
    }

    const error = new FastestValidatorError(params)
    const json = error.toJSON()

    expect(json).toEqual({
      field: params.field,
      type: params.type,
      message: params.message
    })
  })
})
