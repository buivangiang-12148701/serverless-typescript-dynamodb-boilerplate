import { Controller } from '@/presentation/controllers/controller'
import { type APIGatewayProxyResult, type Callback, type Context } from 'aws-lambda'
import { MiddlewareBuilder } from '@/presentation/middlewares/builder'
import type middy from '@middy/core'
import { type AddTodo } from '@/domain/usecases'
import { type EventJSON } from '@/main/types'
import { created, serverError } from '@/presentation/helpers'
import { type Middleware } from '@/presentation/middlewares'

export class CreateTodoController extends Controller {
  private static addTodo: AddTodo
  private static validatorMiddleware: Middleware
  constructor (addTodo: AddTodo, validatorMiddleware: Middleware) {
    CreateTodoController.addTodo = addTodo
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
      const result = await CreateTodoController.addTodo.add(event.body as AddTodo.Params)
      if (result) {
        return created({
          message: 'Todo item was created successfully'
        })
      }
      return serverError()
    } catch (e) {
      return serverError()
    }
  }
}
