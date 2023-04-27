import { Handler } from '@/application/handler/handler'
import { type APIGatewayProxyEvent, type APIGatewayProxyResult, type Callback, type Context } from 'aws-lambda'
import { makePrintMiddleware } from '@/main/factories/application/middlewares'
import { MiddlewareBuilder } from '@/application/middlewares/builder'

export class CreateTodoHandle extends Handler {
  override get middlewares (): any | any[] {
    return [
      ...MiddlewareBuilder.of().withJsonBodyParser().build(),
      makePrintMiddleware()
    ]
  }

  async perform (_event: APIGatewayProxyEvent, _context: Context, _callback: Callback): Promise<APIGatewayProxyResult> {
    console.log('Processing event: ', _event)
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello World!'
      })
    }
  }
}
