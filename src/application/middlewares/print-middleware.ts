import { Middleware } from '@/application/middlewares/middleware'
import { type Request } from '@middy/core'
import { type Context } from 'aws-lambda'

export class PrintMiddleware extends Middleware {
  override async before (request: Request<unknown, any, Error, Context>): Promise<any> {
    console.log('PrintMiddleware: before ', request)
    return Promise.resolve()
  }

  override async after (request: Request<unknown, any, Error, Context>): Promise<any> {
    console.log('PrintMiddleware: after ', request)
    return Promise.resolve()
  }

  override async onError (request: Request<unknown, any, Error, Context>): Promise<any> {
    console.log('PrintMiddleware: onError ', request)
    return Promise.resolve()
  }
}
