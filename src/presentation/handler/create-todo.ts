import { Handler } from '@/presentation/handler/handler'
import { type APIGatewayProxyEvent, type APIGatewayProxyResult, type Callback, type Context } from 'aws-lambda'
import { MiddlewareBuilder } from '@/presentation/middlewares/builder'
import type middy from '@middy/core'
import { type AddTodo } from '@/domain/usecases'

export class CreateTodoHandle extends Handler {
  static addTodo: AddTodo
  constructor (addTodo: AddTodo) {
    super()
    CreateTodoHandle.addTodo = addTodo
  }

  override get middlewares (): Array<middy.MiddlewareObj<any, any, Error, any>> {
    return [
      ...MiddlewareBuilder.of().withJsonBodyParser().build()
    ]
  }

  async perform (_event: APIGatewayProxyEvent, _context: Context, _callback: Callback): Promise<APIGatewayProxyResult> {
    const result = await CreateTodoHandle.addTodo.add({ title: 'demo', description: 'demo' })
    console.log('show result: ', result)
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello World!'
      })
    }
  }
}
