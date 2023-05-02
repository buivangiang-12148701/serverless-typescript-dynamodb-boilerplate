import { Controller } from '@/presentation/controllers'
import { type APIGatewayProxyResult, type Callback, type Context } from 'aws-lambda'
import { MiddlewareBuilder, type Middleware } from '@/presentation/middlewares'
import type middy from '@middy/core'
import { type CreateTodo } from '@/domain/usecases'
import { type EventJSON } from '@/main/types'
import { created, serverError } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

export class CreateTodoController extends Controller {
  constructor (private readonly createTodo: CreateTodo, private readonly validatorMiddleware: Middleware) {
    super()
    this.addMiddlewares = this.addMiddlewares.bind(this)
    this.handler.use(this.addMiddlewares())
    this.handler.handler(this.perform.bind(this))
  }

  override addMiddlewares (): Array<middy.MiddlewareObj<any, any, Error, any>> {
    return [
      ...MiddlewareBuilder.of()
        .withJsonBodyParser()
        .withValidator(this.validatorMiddleware)
        .withSecurityHeaders().build()
    ]
  }

  async perform (event: EventJSON, _context: Context, _callback: Callback): Promise<APIGatewayProxyResult> {
    try {
      const result = await this.createTodo.add(event.body as CreateTodo.Params)
      if (result) {
        return created({
          message: 'Todo item was created successfully'
        })
      }
      return serverError(new ServerError())
    } catch (e) {
      return serverError(new ServerError())
    }
  }
}
