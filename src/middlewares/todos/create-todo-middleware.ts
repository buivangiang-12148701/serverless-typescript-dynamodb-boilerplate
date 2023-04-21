import { type APIGatewayProxyEvent, type APIGatewayProxyResult } from 'aws-lambda'
import { ListValidateError } from '../../types/validator/validation-error'
import type middy from '@middy/core'
import { CreateTodoDto, createTodoSchema } from '@/dto/todos/create-todo-dto'

import Validator from 'fastest-validator'
require('module-alias/register')

const v = new Validator()

export const createTodoMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<void> => {
    console.log('CreateTodoMiddleware: before')
    const check = v.compile(createTodoSchema)
    console.log('Step 1: Check: ', check)
    const errors = await check(request.event.body)
    console.log('Step 2: Errors: ', errors)
    if (Array.isArray(errors) && errors.length > 0) {
      const instanceError = ListValidateError.toEntity({ errors })
      console.log('Step 3.1: NewErrors: ', instanceError)
      throw instanceError
    }
    console.log('Step 3.2: CreateTodoDto: ');
    (request as Record<string, any>).context.todo = CreateTodoDto.toEntity(request.event.body)
    console.log('Step 4: request.context: ', (request as Record<string, any>).context.todo)
  }
  return {
    before
  }
}
