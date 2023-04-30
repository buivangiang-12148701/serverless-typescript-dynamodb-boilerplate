import { ConnectionManager } from '@/infra/db'
import { faker } from '@faker-js/faker'
import { Env } from '@/main/config'

describe('ConnectionManager', () => {
  let sut: ConnectionManager
  let envSpy: jest.SpyInstance
  let createLocalConnectionSpy: jest.SpyInstance
  let createRemoteConnectionSpy: jest.SpyInstance
  beforeEach(() => {
    sut = ConnectionManager.getInstance()
    Object.defineProperty(ConnectionManager, 'connections', {
      value: [],
      writable: true
    })
    envSpy = jest.spyOn(Env.prototype as any, 'getEnv')
    createLocalConnectionSpy = jest.spyOn(ConnectionManager.prototype as any, 'createLocalConnection')
    createRemoteConnectionSpy = jest.spyOn(ConnectionManager.prototype as any, 'createRemoteConnection')
  })
  it('should have only one instance', async () => {
    const sut2 = ConnectionManager.getInstance()
    expect(sut).toBe(sut2)
  })

  describe('connect method', () => {
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

  describe('createConnection method', () => {
    it('should call createLocalConnection if IS_OFFLINE is true', async () => {
      envSpy.mockReturnValue({
        IS_OFFLINE: true
      })
      sut.createConnection('default')
      expect(createLocalConnectionSpy).toBeCalledTimes(1)
    })
    it('should call createRemoteConnection if IS_OFFLINE is false', async () => {
      envSpy.mockReturnValue({
        IS_OFFLINE: false
      })
      sut.createConnection('default')
      expect(createRemoteConnectionSpy).toBeCalledTimes(1)
    })
    it('should create a new local connection if IS_OFFLINE is true and connection does not exists', async () => {
      envSpy.mockReturnValue({
        IS_OFFLINE: true
      })
      const connection = sut.createConnection('default')
      expect(connection.name).toEqual('default')
      expect(connection.isOffline).toEqual(true)
    })
    it('should create a new remote connection if IS_OFFLINE is false and connection does not exists', async () => {
      envSpy.mockReturnValue({
        IS_OFFLINE: false
      })
      const connection = sut.createConnection('default')
      expect(connection.name).toEqual('default')
      expect(connection.isOffline).toEqual(false)
    })
    it('should throw ConnectionNameExistsError if connection already exists', async () => {
      envSpy.mockReturnValue({
        IS_OFFLINE: true
      })
      sut.createConnection('default')
      expect(() => sut.createConnection('default')).toThrow(new ConnectionManager.ConnectionNameExistsError())
    })
  })
})
