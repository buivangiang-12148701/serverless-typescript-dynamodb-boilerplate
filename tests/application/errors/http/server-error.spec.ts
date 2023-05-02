import { ServerError } from '@/application/errors'

describe('ServerError', () => {
  it('should create a ServerError instance with the correct properties', () => {
    const error = new ServerError()

    expect(error).toBeInstanceOf(ServerError)
    expect(error.name).toBe('ServerError')
    expect(error.message).toBe('Something is broken. Try again soon')
  })

  it('should return a JSON string representation of the error object when calling toString()', () => {
    const error = new ServerError()
    const expectedJson = JSON.stringify({ message: 'Something is broken. Try again soon' })

    expect(error.toString()).toBe(expectedJson)
  })
})
