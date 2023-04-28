import httpJsonBodyParser from '@middy/http-json-body-parser'
import type middy from '@middy/core'

export class MiddlewareBuilder {
  private constructor (private readonly middlewares: Array<middy.MiddlewareObj<any, any, Error, any>>) {
  }

  static of (middlewares: Array<middy.MiddlewareObj<any, any, Error, any>> = []): MiddlewareBuilder {
    return new MiddlewareBuilder(middlewares)
  }

  public build (): Array<middy.MiddlewareObj<any, any, Error, any>> {
    return this.middlewares
  }

  /**
   * This middleware automatically parses HTTP requests with a JSON body and converts the body into an object.
   * Also handles gracefully broken JSON as UnprocessableEntity (422 errors) if used in combination with httpErrorHandler.
   *
   * It can also be used in combination with validator as a prior step to normalize the event body input
   * as an object so that the content can be validated.
   */
  withJsonBodyParser (): MiddlewareBuilder {
    this.middlewares.push(httpJsonBodyParser())
    return this
  }
}
