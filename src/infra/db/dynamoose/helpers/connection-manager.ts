import { type DynamoDBClientConfig } from '@aws-sdk/client-dynamodb/dist-types/DynamoDBClient'
import * as dynamoose from 'dynamoose'
import { Env } from '@/main/config'
import { ConnectionNameExistsError } from '@/infra/db/dynamoose/errors'

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
    const newInstance = Env.getInstance().getEnv().IS_OFFLINE === 'true' ? this.createLocalConnection() : this.createRemoteConnection(config)
    const newConnection = {
      name,
      instance: newInstance,
      isOffline: Env.getInstance().getEnv().IS_OFFLINE === 'true'
    }
    const index = ConnectionManager.connections.findIndex(connection => connection.name === name)
    if (index === -1) {
      ConnectionManager.connections.push(newConnection)
      this.updateDynamoose()
      return newConnection
    }
    throw new ConnectionNameExistsError()
  }

  private createLocalConnection (endpoint?: string): ConnectionManager.LocalConnection {
    const { DYNAMODB_PROTOCOL, DYNAMODB_HOST, DYNAMODB_PORT } = Env.getInstance().getEnv()
    return endpoint ?? `${DYNAMODB_PROTOCOL}://${DYNAMODB_HOST}:${DYNAMODB_PORT}`
  }

  private createRemoteConnection (config: DynamoDBClientConfig = Env.getInstance().getEnv().REGION): ConnectionManager.RemoteConnection {
    return config
  }

  private updateDynamoose (): void {
    const lastConnection = ConnectionManager.connections[ConnectionManager.connections.length - 1]
    if (lastConnection.isOffline) {
      dynamoose.aws.ddb.local(lastConnection.instance as ConnectionManager.LocalConnection)
    } else {
      dynamoose.aws.ddb.set(new dynamoose.aws.ddb.DynamoDB(lastConnection as ConnectionManager.RemoteConnection))
    }
  }
}

export declare namespace ConnectionManager {
  export type Connection = {
    name: string
    instance: LocalConnection | RemoteConnection
    isOffline: boolean
  }
  export type LocalConnection = string | undefined

  export type RemoteConnection = DynamoDBClientConfig

}
