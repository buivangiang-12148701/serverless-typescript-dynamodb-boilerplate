import { PrintMiddleware } from '@/presentation/middlewares'

jest.spyOn(console, 'log').mockImplementation(() => {})

const createRequest = (event: any = {}, context: any = {}): any => ({
  event,
  context,
  response: {},
  error: null
})

describe('PrintMiddleware', () => {
  it('PrintMiddleware: before logs the correct message and returns a resolved promise', async () => {
    const middleware = new PrintMiddleware()
    const request = createRequest()
    const logSpy = jest.spyOn(console, 'log')

    await middleware.before(request)

    expect(logSpy).toHaveBeenCalledWith('PrintMiddleware: before ', request)
    expect.assertions(1)
  })

  it('PrintMiddleware: after logs the correct message and returns a resolved promise', async () => {
    const middleware = new PrintMiddleware()
    const request = createRequest()
    const logSpy = jest.spyOn(console, 'log')

    await middleware.after(request)

    expect(logSpy).toHaveBeenCalledWith('PrintMiddleware: after ', request)
    expect.assertions(1)
  })

  test('PrintMiddleware: onError logs the correct message and returns a resolved promise', async () => {
    const middleware = new PrintMiddleware()
    const request = createRequest()
    const logSpy = jest.spyOn(console, 'log')

    await middleware.onError(request)

    expect(logSpy).toHaveBeenCalledWith('PrintMiddleware: onError ', request)
    expect.assertions(1)
  })
})
