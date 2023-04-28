import { type APIGatewayProxyEvent } from 'aws-lambda'

export type EventJSON = APIGatewayProxyEvent & {
  body: object
}
