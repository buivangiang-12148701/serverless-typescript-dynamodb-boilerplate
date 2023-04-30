import { type DynamoDBClientConfig } from '@aws-sdk/client-dynamodb/dist-types/DynamoDBClient'
import * as dynamoose from 'dynamoose'
import { Env } from '@/main/config'

export class ConnectionManager {
  private static instance?: ConnectionManager
  private static readonly connections: ConnectionManager.Connection[] = []

  private constructor () {}

  static getInstance (): ConnectionManager {
    if (ConnectionManager.instance === undefined) {
      ConnectionManager.instance = new ConnectionManager()
    }
    return ConnectionManager.instance
  }

  public connect (): void {
    if (this.getConnection('default') === undefined) {
      this.createConnection('default')
    }
  }

  public getConnection (name: string): ConnectionManager.Connection | undefined {
    return ConnectionManager.connections.find(connection => connection.name === name)
  }

  public createConnection (name: string, config?: DynamoDBClientConfig): ConnectionManager.Connection {
    const newInstance = Env.getInstance().getEnv().IS_OFFLINE ? this.createLocalConnection() : this.createRemoteConnection(config)
    const newConnection = {
      name,
      instance: newInstance,
      isOffline: Env.getInstance().getEnv().IS_OFFLINE
    }
    const index = ConnectionManager.connections.findIndex(connection => connection.name === name)
    if (index === -1) {
      ConnectionManager.connections.push(newConnection)
      this.updateDynamoose()
      return newConnection
    }
    throw new ConnectionManager.ConnectionNameExistsError()
  }

  private createLocalConnection (endpoint?: string): ConnectionManager.LocalConnection {
    const { DYNAMODB_PROTOCOL, DYNAMODB_HOST, DYNAMODB_PORT } = Env.getInstance().getEnv()
    return endpoint ?? `${DYNAMODB_PROTOCOL}://${DYNAMODB_HOST}:${DYNAMODB_PORT}`
  }

  private createRemoteConnection (config?: DynamoDBClientConfig): ConnectionManager.RemoteConnection {
    return (config != null)
      ? config
      : { region: Env.getInstance().getEnv().REGION }
  }

  private updateDynamoose (): void {
    const lastConnection = ConnectionManager.connections[ConnectionManager.connections.length - 1]
    if (lastConnection === undefined) {
      throw new ConnectionManager.ConnectionNotFoundError()
    }
    if (lastConnection.isOffline) {
      dynamoose.aws.ddb.local(lastConnection.instance as ConnectionManager.LocalConnection)
    } else {
      dynamoose.aws.ddb.set(new dynamoose.aws.ddb.DynamoDB(lastConnection as ConnectionManager.RemoteConnection))
    }
  }
}

export namespace ConnectionManager {
  export type Connection = {
    name: string
    instance: LocalConnection | RemoteConnection
    isOffline: boolean
  }
  export type LocalConnection = string | undefined

  export type RemoteConnection = DynamoDBClientConfig

  export class ConnectionNameExistsError extends Error {
    constructor () {
      super()
      this.name = 'ConnectionNameExistsError'
      this.message = 'Connection name already exists'
    }
  }

  export class ConnectionNotFoundError extends Error {
    constructor () {
      super()
      this.name = 'ConnectionNotFoundError'
      this.message = 'Connection not found'
    }
  }
}
