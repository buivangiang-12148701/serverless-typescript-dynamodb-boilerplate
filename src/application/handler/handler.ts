import { type APIGatewayProxyEvent, type APIGatewayProxyResult, type Callback, type Context } from 'aws-lambda'
import middy, { type MiddyfiedHandler } from '@middy/core'

export abstract class Handler {
  handler: MiddyfiedHandler
  constructor () {
    this.handler = middy(this.perform)
    this.addMiddlewares()
  }

  abstract perform (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyResult>

  get middlewares (): any | any[] {
    return []
  }

  private addMiddlewares (): void {
    if (Array.isArray(this.middlewares)) {
      this.middlewares.forEach(m => this.handler.use(m))
    } else {
      this.handler.use(this.middlewares)
    }
  }
}
