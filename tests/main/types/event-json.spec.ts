import { type APIGatewayProxyEvent } from 'aws-lambda'
import { type EventJSON } from '@/main/types'

describe('EventJSON', () => {
  it('should be an object containing APIGatewayProxyEvent and a body object', () => {
    const mockEvent: APIGatewayProxyEvent = {
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

    const mergeObject = Object.assign(mockEvent, { body: { key: 'value' } })
    const eventJson: EventJSON = mergeObject as EventJSON

    expect(eventJson).toHaveProperty('body', { key: 'value' })
    expect(eventJson).toHaveProperty('httpMethod', 'GET')
    expect(eventJson).toHaveProperty('path', '/')
    expect(eventJson).toHaveProperty('requestContext')
    expect(eventJson.requestContext).toHaveProperty('identity')
    expect(eventJson.requestContext.identity).toHaveProperty('sourceIp', '127.0.0.1')
  })
})
