import { Middleware } from '@/presentation/middlewares/middleware'
import { type Request } from '@middy/core'
import { type Context } from 'aws-lambda'
import type Validator from 'fastest-validator'
import { get } from '@/presentation/helpers/util'
import { badRequest } from '@/presentation/helpers'
import { BadRequestError } from '@/presentation/errors'
import { ValidationErrorImpl } from '@/presentation/errors/validator'

export class ValidatorMiddleware extends Middleware {
  private static validator: Validator
  private static schema: object
  constructor (validator: Validator, schema: object) {
    super()
    ValidatorMiddleware.validator = validator
    ValidatorMiddleware.schema = schema
  }

  override async before (request: Request<unknown, any, Error, Context>): Promise<any> {
    try {
      const body = get(request, 'event.body', {})
      const check = ValidatorMiddleware.validator.compile(ValidatorMiddleware.schema)
      const errors = await check(body)
      if (Array.isArray(errors)) {
        const validationErrors = errors.map(item => new ValidationErrorImpl(item))
        return Promise.reject(validationErrors)
      }
      return Promise.resolve()
    } catch (e) {
      const error = new BadRequestError({ message: 'Schema is invalid' })
      return badRequest(error)
    }
  }

  override async onError (request: Request<unknown, any, Error, Context>): Promise<any> {
    if (Array.isArray(request.error) && request.error.length > 0 && request.error[0] instanceof ValidationErrorImpl) {
      const error = new BadRequestError({ errors: request.error })
      return badRequest(error)
    }
    return Promise.resolve()
  }
}
