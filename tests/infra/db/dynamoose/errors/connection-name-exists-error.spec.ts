import { ConnectionNameExistsError } from '@/infra/db'

describe('ConnectionNameExistsError', () => {
  it('should have correct properties when instantiated', () => {
    const error = new ConnectionNameExistsError()

    expect(error).toBeInstanceOf(ConnectionNameExistsError)
    expect(error).toBeInstanceOf(Error)
    expect(error.name).toBe('ConnectionNameExistsError')
    expect(error.message).toBe('Connection name already exists')
  })
})
