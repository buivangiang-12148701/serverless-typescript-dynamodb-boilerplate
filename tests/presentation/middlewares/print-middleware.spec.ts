import { PrintMiddleware } from '@/presentation/middlewares'

jest.spyOn(console, 'log').mockImplementation(() => {})

const createRequest = (event: any = {}, context: any = {}): any => ({
  event,
  context,
  response: {},
  error: null
})

describe('PrintMiddleware', () => {
  let logSpy: jest.SpyInstance
  let request: any
  let sut: PrintMiddleware

  beforeEach(() => {
    request = createRequest()
    logSpy = jest.spyOn(console, 'log')
    sut = new PrintMiddleware()
  })

  it('PrintMiddleware: before logs the correct message and returns a resolved promise', async () => {
    await sut.before(request)

    expect(logSpy).toHaveBeenCalledWith('PrintMiddleware: before ', request)
    expect.assertions(1)
  })

  it('PrintMiddleware: after logs the correct message and returns a resolved promise', async () => {
    await sut.after(request)

    expect(logSpy).toHaveBeenCalledWith('PrintMiddleware: after ', request)
    expect.assertions(1)
  })

  test('PrintMiddleware: onError logs the correct message and returns a resolved promise', async () => {
    await sut.onError(request)

    expect(logSpy).toHaveBeenCalledWith('PrintMiddleware: onError ', request)
    expect.assertions(1)
  })
})
