import { Env } from '@/main/config'
import * as dynamoose from 'dynamoose'
import { type DynamoDBClientConfig } from '@aws-sdk/client-dynamodb/dist-types/DynamoDBClient'

export class Connection {
  private static instance?: Connection
  private constructor () {}

  static getInstances (): Connection {
    if (Connection.instance === undefined) {
      Connection.instance = new Connection()
    }
    return Connection.instance
  }

  public connect (config?: DynamoDBClientConfig): void {
    if (Env.IS_OFFLINE) {
      const url = `${Env.DYNAMODB_PROTOCOL}://${Env.DYNAMODB_HOST}:${Env.DYNAMODB_PORT}`
      dynamoose.aws.ddb.local(url)
    } else {
      const getConfig = config ?? {
        region: Env.REGION
      }
      const ddb = new dynamoose.aws.ddb.DynamoDB(getConfig)
      dynamoose.aws.ddb.set(ddb)
    }
  }
}
