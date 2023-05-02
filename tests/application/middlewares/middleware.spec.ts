import { Middleware } from '@/application/middlewares'

class TestMiddleware extends Middleware {}

describe('Middleware', () => {
  const testMiddleware = new TestMiddleware()

  const mockRequest: any = {
    event: {},
    context: {},
    response: {},
    error: new Error('Test error')
  }

  describe('before', () => {
    it('returns a resolved promise', async () => {
      const result = await testMiddleware.before(mockRequest)
      expect(result).toBeUndefined()
    })
  })

  describe('after', () => {
    it('returns a resolved promise', async () => {
      const result = await testMiddleware.after(mockRequest)
      expect(result).toBeUndefined()
    })
  })

  describe('onError', () => {
    it('returns a resolved promise', async () => {
      const result = await testMiddleware.onError(mockRequest)
      expect(result).toBeUndefined()
    })
  })
})
