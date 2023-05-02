import type middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpSecurityHeaders from '@middy/http-security-headers'
import { type Middleware, MiddlewareBuilder } from '@/application/middlewares'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('MiddlewareBuilder', () => {
  let middlewareSpy: MockProxy<Middleware>

  beforeEach(() => {
    middlewareSpy = mock()
  })
  it('should create an instance with the provided middlewares', () => {
    const middlewares: Array<middy.MiddlewareObj<any, any, Error, any>> = [
      httpJsonBodyParser(),
      httpSecurityHeaders()
    ]

    const builder = MiddlewareBuilder.of(middlewares)
    expect(builder.build()).toEqual(middlewares)
  })

  it('should add a JSON body parser middleware', () => {
    const builder = MiddlewareBuilder.of()
    builder.withJsonBodyParser()

    const middlewares = builder.build()
    expect(middlewares).toHaveLength(1)
  })

  it('should add security headers middleware', () => {
    const builder = MiddlewareBuilder.of()
    builder.withSecurityHeaders()

    const middlewares = builder.build()
    expect(middlewares).toHaveLength(1)
  })

  it('should add a custom validator middleware', () => {
    const builder = MiddlewareBuilder.of()
    builder.withValidator(middlewareSpy)

    const middlewares = builder.build()
    expect(middlewares).toHaveLength(1)
  })
})
