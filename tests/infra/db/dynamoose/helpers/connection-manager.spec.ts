import { ConnectionManager, ConnectionNameExistsError } from '@/infra/db'
import { faker } from '@faker-js/faker'
import { Env } from '@/main/config'

describe('ConnectionManager', () => {
  let sut: ConnectionManager
  let envSpy: jest.SpyInstance
  let createLocalConnectionSpy: jest.SpyInstance
  let createRemoteConnectionSpy: jest.SpyInstance
  let updateDynamooseSpy: jest.SpyInstance
  let connection: ConnectionManager.Connection
  beforeEach(() => {
    sut = ConnectionManager.getInstance()
    Object.defineProperty(ConnectionManager, 'connections', {
      value: [],
      writable: true
    })
    envSpy = jest.spyOn(Env.prototype as any, 'getEnv')
    createLocalConnectionSpy = jest.spyOn(ConnectionManager.prototype as any, 'createLocalConnection')
    createRemoteConnectionSpy = jest.spyOn(ConnectionManager.prototype as any, 'createRemoteConnection')
    updateDynamooseSpy = jest.spyOn(ConnectionManager.prototype as any, 'updateDynamoose')
    envSpy.mockReturnValue({
      IS_OFFLINE: true
    })
    connection = {
      name: 'Test Connection',
      instance: {},
      isOffline: true
    }
  })
  describe('getInstance method', () => {
    it('should have only one instance', async () => {
      const sut2 = ConnectionManager.getInstance()
      expect(sut).toBe(sut2)
    })
  })

  describe('getConnection method', () => {
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

  describe('connect method', () => {
    it('should call createConnection if connection `default` does not exist', async () => {
      const createConnectionSpy = jest.spyOn(sut, 'createConnection')
      sut.connect()
      expect(createConnectionSpy).toBeCalledTimes(1)
    })
    it('should not call createConnection if connection `default` exists', async () => {
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
      const createConnectionSpy = jest.spyOn(sut, 'createConnection')
      sut.connect()
      expect(createConnectionSpy).not.toBeCalled()
    })
  })

  describe('createConnection method', () => {
    it('should call createLocalConnection if IS_OFFLINE is true', async () => {
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
      sut.createConnection('default')
      expect(() => sut.createConnection('default')).toThrow(new ConnectionNameExistsError())
    })
    it('should call updateDynamoose if connection is created', async () => {
      sut.createConnection('default')
      expect(updateDynamooseSpy).toBeCalledTimes(1)
    })
  })

  it('Connection should have properties name, instance, isOffline', async () => {
    expect(connection.name).toBe('Test Connection')
    expect(connection.instance).toBeDefined()
    expect(connection.isOffline).toBe(true)
  })

  it('Connection should have value is string or undefined', async () => {
    let localConnection: ConnectionManager.LocalConnection = faker.lorem.words(5)
    expect(localConnection).toBeDefined()
    localConnection = undefined
    expect(localConnection).toBeUndefined()
  })
})
