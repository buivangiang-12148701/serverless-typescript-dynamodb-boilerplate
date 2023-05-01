import { type APIGatewayProxyEvent } from 'aws-lambda'
import { Controller } from '@/presentation/controllers'
import type middy from '@middy/core'
import { MiddlewareBuilder } from '@/presentation/middlewares'
import { faker } from '@faker-js/faker'

jest.spyOn(console, 'log').mockImplementation(() => {})
class TestController extends Controller {
  async perform (_event: APIGatewayProxyEvent) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello from TestController!' })
    }
  }
}

class TestControllerWithMiddleware extends Controller {
  override get middlewares (): Array<middy.MiddlewareObj<any, any, Error, any>> {
    return [
      ...MiddlewareBuilder.of()
        .withJsonBodyParser()
        .withSecurityHeaders().build()
    ]
  }

  async perform (_event: APIGatewayProxyEvent) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello from TestControllerWithMiddleware!' })
    }
  }
}

class TestControllerOverrideHook extends Controller {
  override async perform (_event: APIGatewayProxyEvent) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello from TestControllerOverrideHook!' })
    }
  }

  override async beforePrefetch (): Promise<void> {
    console.log('beforePrefetch')
    return Promise.resolve()
  }

  override async requestStart (): Promise<void> {
    console.log('requestStart')
    return Promise.resolve()
  }

  override async beforeMiddleware (_fctName: string): Promise<void> {
    console.log('beforeMiddleware')
    return Promise.resolve()
  }

  override async afterMiddleware (_fctName: string): Promise<void> {
    console.log('afterMiddleware')
    return Promise.resolve()
  }

  override async beforeHandler (): Promise<void> {
    console.log('beforeHandler')
    return Promise.resolve()
  }

  override async afterHandler (): Promise<void> {
    console.log('afterHandler')
    return Promise.resolve()
  }

  override async requestEnd (): Promise<void> {
    console.log('requestEnd')
    return Promise.resolve()
  }
}

describe('Controller', () => {
  let controller: TestController
  let controllerWithMiddleware: TestControllerWithMiddleware
  let controllerOverrideHook: TestControllerOverrideHook
  let logSpy: jest.SpyInstance
  let event: APIGatewayProxyEvent

  beforeEach(() => {
    controller = new TestController()
    controllerWithMiddleware = new TestControllerWithMiddleware()
    controllerOverrideHook = new TestControllerOverrideHook()
    logSpy = jest.spyOn(console, 'log')

    event = {
      body: JSON.stringify({ key: 'value' }),
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'GET',
      isBase64Encoded: false,
      path: '/',
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {
        authorizer: null,
        protocol: 'https',
        accountId: 'test-account',
        apiId: 'test-api',
        httpMethod: 'GET',
        identity: {
          principalOrgId: '',
          accessKey: null,
          accountId: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          sourceIp: '127.0.0.1',
          user: null,
          userAgent: null,
          userArn: null
        },
        path: '/',
        stage: 'test',
        requestId: 'test-request',
        requestTimeEpoch: 123456789,
        resourceId: 'test-resource',
        resourcePath: '/'
      },
      resource: '/'
    }
  })

  it('should return a response with statusCode 200 and a message', async () => {
    const response = await controller.perform(event)
    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.body)).toEqual({ message: 'Hello from TestController!' })
  })

  it('should have no middlewares', () => {
    expect(controller.middlewares.length).toEqual(0)
  })

  it('should have 2 middlewares', () => {
    expect(controllerWithMiddleware.middlewares.length).toEqual(2)
  })

  it('should override beforePrefetch method', async () => {
    await controllerOverrideHook.beforePrefetch()
    expect(logSpy).toHaveBeenCalledWith('beforePrefetch')
    expect.assertions(1)
  })
  it('should override requestStart method', async () => {
    await controllerOverrideHook.requestStart()
    expect(logSpy).toHaveBeenCalledWith('requestStart')
    expect.assertions(1)
  })
  it('should override beforeMiddleware method', async () => {
    await controllerOverrideHook.beforeMiddleware(faker.lorem.words(5))
    expect(logSpy).toHaveBeenCalledWith('beforeMiddleware')
    expect.assertions(1)
  })

  it('should override afterMiddleware method', async () => {
    await controllerOverrideHook.afterMiddleware(faker.lorem.words(5))
    expect(logSpy).toHaveBeenCalledWith('afterMiddleware')
    expect.assertions(1)
  })

  it('should override beforeHandler method', async () => {
    await controllerOverrideHook.beforeHandler()
    expect(logSpy).toHaveBeenCalledWith('beforeHandler')
    expect.assertions(1)
  })

  it('should override afterHandler method', async () => {
    await controllerOverrideHook.afterHandler()
    expect(logSpy).toHaveBeenCalledWith('afterHandler')
    expect.assertions(1)
  })

  it('should override requestEnd method', async () => {
    await controllerOverrideHook.requestEnd()
    expect(logSpy).toHaveBeenCalledWith('requestEnd')
    expect.assertions(1)
  })
})
