import { Middleware } from '@/application/middlewares/middleware'

export class PrintMiddleware extends Middleware {
  override async before (): Promise<any> {
    console.log('before middleware override print middleware')
    return Promise.resolve()
  }
}
