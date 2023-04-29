import { Middleware } from '@/presentation/middlewares'
import { type Request } from '@middy/core'
import { type Context } from 'aws-lambda'
import { get, badRequest } from '@/presentation/helpers'
import { BadRequestError, FastestValidatorError as FastestValidatorErrorImpl } from '@/presentation/errors'
import { type Validator } from '@/presentation/validator'

export class ValidatorMiddleware extends Middleware {
  private static validator: Validator<Error[], boolean>
  constructor (validator: Validator<Error[], boolean>) {
    super()
    ValidatorMiddleware.validator = validator
  }

  override async before (request: Request<unknown, any, Error, Context>): Promise<any> {
    try {
      const body = get(request, 'event.body', {})
      const errors = await ValidatorMiddleware.validator.validate(body)
      if (Array.isArray(errors)) {
        return Promise.reject(errors)
      }
      return Promise.resolve()
    } catch (e) {
      const error = new BadRequestError({ message: 'Schema is invalid' })
      return badRequest(error)
    }
  }

  override async onError (request: Request<unknown, any, Error, Context>): Promise<any> {
    if (Array.isArray(request.error) && request.error.length > 0 && request.error[0] instanceof FastestValidatorErrorImpl) {
      const strError = request.error.map(item => item.toJSON())
      const error = new BadRequestError({ errors: strError })
      return badRequest(error)
    }
    return Promise.resolve()
  }
}
