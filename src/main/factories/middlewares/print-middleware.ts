import { PrintMiddleware } from '@/presentation/middlewares'

export const makePrintMiddleware = (): PrintMiddleware => {
  return new PrintMiddleware()
}
