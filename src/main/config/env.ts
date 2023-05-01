import { cleanEnv, port, str } from 'envalid'

export class Env {
  private static instance?: Env

  private constructor () {}
  static getInstance (): Env {
    if (Env.instance === undefined) {
      Env.instance = new Env()
    }
    return Env.instance
  }

  public getEnv () {
    return cleanEnv(process.env, {
      IS_OFFLINE: str({ default: 'false' }),
      REGION: str({ default: 'us-east-1' }),
      DYNAMODB_TABLE_TODO: str({ default: 'todos' }),
      DYNAMODB_PROTOCOL: str({ default: 'http' }),
      DYNAMODB_HOST: str({ default: 'localhost' }),
      DYNAMODB_PORT: port({ default: 8000 })
    })
  }
}
