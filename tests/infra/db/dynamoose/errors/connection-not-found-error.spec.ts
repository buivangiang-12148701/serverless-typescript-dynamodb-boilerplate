import { ConnectionNotFoundError } from '@/infra/db'

describe('ConnectionNotFoundError', () => {
  it('should have correct properties when instantiated', () => {
    const error = new ConnectionNotFoundError()

    expect(error).toBeInstanceOf(ConnectionNotFoundError)
    expect(error).toBeInstanceOf(Error)
    expect(error.name).toBe('ConnectionNotFoundError')
    expect(error.message).toBe('Connection not found')
  })
})
