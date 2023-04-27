import type middy from '@middy/core'
import { type Request } from '@middy/core'
import { type Context } from 'aws-lambda'

export abstract class Middleware implements middy.MiddlewareObj {
  async before (_request: Request<unknown, any, Error, Context>): Promise<any> {
    return Promise.resolve()
  }

  async after (_request: Request<unknown, any, Error, Context>): Promise<any> {
    return Promise.resolve()
  }

  async onError (_request: Request<unknown, any, Error, Context>): Promise<any> {
    return Promise.resolve()
  }
}
