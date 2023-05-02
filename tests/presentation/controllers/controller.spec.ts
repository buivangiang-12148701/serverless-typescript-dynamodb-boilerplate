import { type APIGatewayProxyEvent } from 'aws-lambda'
import { Controller, type HookParams } from '@/presentation/controllers'
import type middy from '@middy/core'
import { MiddlewareBuilder } from '@/presentation/middlewares'
import { faker } from '@faker-js/faker'

class TestController extends Controller {
  async perform (_event: APIGatewayProxyEvent) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello from TestController!' })
    }
  }
}

class TestControllerWithMiddleware extends Controller {
  override addMiddlewares (): Array<middy.MiddlewareObj<any, any, Error, any>> {
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
    await super.beforePrefetch()
    return Promise.resolve()
  }

  override async requestStart (): Promise<void> {
    await super.requestStart()
    return Promise.resolve()
  }

  override async beforeMiddleware (_fctName: string): Promise<void> {
    await super.beforeMiddleware(_fctName)
    return Promise.resolve()
  }

  override async afterMiddleware (_fctName: string): Promise<void> {
    await super.afterMiddleware(_fctName)
    return Promise.resolve()
  }

  override async beforeHandler (): Promise<void> {
    await super.beforeHandler()
    return Promise.resolve()
  }

  override async afterHandler (): Promise<void> {
    await super.afterHandler()
    return Promise.resolve()
  }

  override async requestEnd (_request: middy.Request): Promise<void> {
    await super.requestEnd(_request)
    return Promise.resolve()
  }

  override defineHooks (_params: HookParams = {}): any {
    return super.defineHooks(_params)
  }
}

describe('Controller', () => {
  let controller: TestController
  let controllerWithMiddleware: TestControllerWithMiddleware
  let controllerOverrideHook: TestControllerOverrideHook
  let event: APIGatewayProxyEvent

  beforeEach(() => {
    controller = new TestController()
    controllerWithMiddleware = new TestControllerWithMiddleware()
    controllerOverrideHook = new TestControllerOverrideHook()

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
    const middlewares = controller.addMiddlewares()
    expect(middlewares.length).toEqual(0)
  })

  it('should have 2 middlewares', () => {
    const middlewares = controllerWithMiddleware.addMiddlewares()
    expect(middlewares.length).toEqual(2)
  })

  it('should override beforePrefetch method', async () => {
    await expect(controllerOverrideHook.beforePrefetch()).resolves.toBeUndefined()
  })
  it('should override requestStart method', async () => {
    await expect(controllerOverrideHook.requestStart()).resolves.toBeUndefined()
  })
  it('should override beforeMiddleware method', async () => {
    await expect(controllerOverrideHook.beforeMiddleware(faker.lorem.words(5))).resolves.toBeUndefined()
  })

  it('should override afterMiddleware method', async () => {
    await expect(controllerOverrideHook.afterMiddleware(faker.lorem.words(5))).resolves.toBeUndefined()
  })

  it('should override beforeHandler method', async () => {
    await expect(controllerOverrideHook.beforeHandler()).resolves.toBeUndefined()
  })

  it('should override afterHandler method', async () => {
    await expect(controllerOverrideHook.afterHandler()).resolves.toBeUndefined()
  })

  it('should override requestEnd method', async () => {
    await expect(controllerOverrideHook.requestEnd({} as any)).resolves.toBeUndefined()
  })
  it('should override defineHooks method', async () => {
    const result = controllerOverrideHook.defineHooks()
    expect(result).toBeInstanceOf(Object)
  })
})
