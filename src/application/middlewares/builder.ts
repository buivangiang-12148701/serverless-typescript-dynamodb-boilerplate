import httpJsonBodyParser from '@middy/http-json-body-parser'
import { type Middleware } from '@/application/middlewares/middleware'
import type middy from '@middy/core'

export class MiddlewareBuilder {
  private constructor (private readonly middlewares: Middleware[] & Array<middy.MiddlewareObj<any, any, Error, any>>) {}
  static of (middlewares: Middleware[] = []): MiddlewareBuilder {
    return new MiddlewareBuilder(middlewares)
  }

  public build (): Middleware[] {
    return this.middlewares
  }

  withJsonBodyParser (): MiddlewareBuilder {
    this.middlewares.push(httpJsonBodyParser())
    return this
  }
}
