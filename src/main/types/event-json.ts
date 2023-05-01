import { type APIGatewayProxyEvent } from 'aws-lambda'

export type EventJSON = APIGatewayProxyEvent & {
  // because we used library http-json-body-parser should body will convert string to object
  body: object
}
