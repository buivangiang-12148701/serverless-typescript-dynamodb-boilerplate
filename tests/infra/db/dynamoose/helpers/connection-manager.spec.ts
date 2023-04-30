import { ConnectionManager } from '@/infra/db'
import { faker } from '@faker-js/faker'

describe('ConnectionManager', () => {
  let sut: ConnectionManager

  beforeEach(() => {
    sut = ConnectionManager.getInstance()
    Object.defineProperty(ConnectionManager, 'connections', {
      value: [],
      writable: true
    })
  })
  it('should have only one instance', async () => {
    const sut2 = ConnectionManager.getInstance()
    expect(sut).toBe(sut2)
  })

  describe('getConnection', () => {
    it('should return a Connection instance if it exists', async () => {
      Object.defineProperty(ConnectionManager, 'connections', {
        value: [
          {
            name: 'default',
            isOffline: true,
            instance: faker.internet.avatar()
          }
        ],
        writable: true
      })
      const connection = sut.getConnection('default')
      expect(connection?.name).toEqual('default')
    })
    it('should return undefined if it does not exists', async () => {
      const connection = sut.getConnection('default')
      expect(connection).toBeUndefined()
    })
  })
})
