import { type APIGatewayProxyEvent } from 'aws-lambda'
import { Controller } from '@/presentation/controllers'

class TestController extends Controller {
  async perform (_event: APIGatewayProxyEvent) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello from TestController!' })
    }
  }
}

describe('Controller', () => {
  let controller: TestController
  let event: APIGatewayProxyEvent

  beforeEach(() => {
    controller = new TestController()
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

  test('should return a response with statusCode 200 and a message', async () => {
    const response = await controller.perform(event)
    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.body)).toEqual({ message: 'Hello from TestController!' })
  })

  test('should have no middlewares', () => {
    expect(controller.middlewares.length).toEqual(0)
  })
})
