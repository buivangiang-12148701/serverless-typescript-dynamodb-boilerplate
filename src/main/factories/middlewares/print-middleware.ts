import { PrintMiddleware } from '@/application/middlewares'

export const makePrintMiddleware = (): PrintMiddleware => {
  return new PrintMiddleware()
}
