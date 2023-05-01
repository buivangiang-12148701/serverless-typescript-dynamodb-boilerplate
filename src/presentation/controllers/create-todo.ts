import { Controller } from '@/presentation/controllers'
import { type APIGatewayProxyResult, type Callback, type Context } from 'aws-lambda'
import { MiddlewareBuilder, type Middleware } from '@/presentation/middlewares'
import type middy from '@middy/core'
import { type CreateTodo } from '@/domain/usecases'
import { type EventJSON } from '@/main/types'
import { created, serverError } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

export class CreateTodoController extends Controller {
  private static createTodo: CreateTodo
  private static validatorMiddleware: Middleware
  constructor (createTodo: CreateTodo, validatorMiddleware: Middleware) {
    CreateTodoController.createTodo = createTodo
    CreateTodoController.validatorMiddleware = validatorMiddleware
    super()
  }

  override get middlewares (): Array<middy.MiddlewareObj<any, any, Error, any>> {
    return [
      ...MiddlewareBuilder.of()
        .withJsonBodyParser()
        .withValidator(CreateTodoController.validatorMiddleware)
        .withSecurityHeaders().build()
    ]
  }

  async perform (event: EventJSON, _context: Context, _callback: Callback): Promise<APIGatewayProxyResult> {
    try {
      const result = await CreateTodoController.createTodo.add(event.body as CreateTodo.Params)
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
