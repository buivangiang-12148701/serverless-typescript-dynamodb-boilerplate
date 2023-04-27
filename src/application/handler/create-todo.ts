import { Handler } from '@/application/handler/handler'
import { type APIGatewayProxyEvent, type APIGatewayProxyResult, type Callback, type Context } from 'aws-lambda'
import { PrintMiddleware } from '@/application/middlewares'

export class CreateTodoHandle extends Handler {
  override get middlewares (): any | any[] {
    return [
      new PrintMiddleware()
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
