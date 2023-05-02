import httpJsonBodyParser from '@middy/http-json-body-parser'
import type middy from '@middy/core'
import httpSecurityHeaders from '@middy/http-security-headers'
import { type Middleware } from '@/application/middlewares'

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
   *
   * More detail please refer link: https://middy.js.org/docs/middlewares/http-json-body-parser
   */
  withJsonBodyParser (): MiddlewareBuilder {
    this.middlewares.push(httpJsonBodyParser())
    return this
  }

  /**
   * Applies best practice security headers to responses. It's a simplified port of HelmetJS.
   * See HelmetJS documentation for more details.
   *
   * More detail please refer link https://middy.js.org/docs/middlewares/http-security-headers
   */
  withSecurityHeaders (): MiddlewareBuilder {
    this.middlewares.push(httpSecurityHeaders())
    return this
  }

  withValidator (validator: Middleware): MiddlewareBuilder {
    this.middlewares.push(validator)
    return this
  }
}
