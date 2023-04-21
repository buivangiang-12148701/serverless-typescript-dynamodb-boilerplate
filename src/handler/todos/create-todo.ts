import { type APIGatewayProxyEvent, type APIGatewayProxyResult } from 'aws-lambda'
import { DynamoDB, type DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { type ContextTodo } from '../../types/todos/context-todo'
import { marshall } from '@aws-sdk/util-dynamodb'
import { type HttpResponseTodoSuccess } from '../../types/todos/http-todo-response-success'
import { nanoid } from 'nanoid'
import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { createTodoMiddleware } from '../../middlewares/todos/create-todo-middleware'
import { httpTodoException } from '../../exceptions/todos/http-todo-exception'
import { CreateTodoError } from '@/types/todos/create-todo-error'

const configuration: DynamoDBClientConfig = {
}

// check if process.env is object and has IS_OFFLINE property and is true
if (typeof process.env === 'object' && process.env !== null && 'IS_OFFLINE' in process.env && process.env.IS_OFFLINE === 'true') {
  configuration.region = process.env.AWS_REGION
  configuration.endpoint = process.env.ENDPOINT
}
const client = new DynamoDB(configuration)

const createTodo = async (_event: APIGatewayProxyEvent, context: ContextTodo): Promise<APIGatewayProxyResult> => {
  const { DYNAMODB_TABLE_TODO } = process.env
  if (typeof DYNAMODB_TABLE_TODO !== 'string') {
    throw new Error('DYNAMODB_TABLE_TODO is not a string')
  }
  const paramsPutItem = {
    RequestItems: {
      [`${DYNAMODB_TABLE_TODO}`]: [
        {
          PutRequest: {
            Item: marshall({
              id: nanoid(),
              ...context.todo
            })
          }
        }
      ]
    }
  }
  try {
    await client.batchWriteItem(paramsPutItem)
    const responseSuccess: HttpResponseTodoSuccess = {
      code: 200,
      success: true,
      message: 'Todo successfully created.'
    }
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      isBase64Encoded: false,
      body: JSON.stringify(responseSuccess)
    }
  } catch (error) {
    console.log('show create todo error: ', error)
    const errors: Error[] = []
    errors.push(
      new CreateTodoError()
    )
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      isBase64Encoded: false,
      body: JSON.stringify(errors)
    }
  }
}

export const handler = middy(createTodo).use(httpJsonBodyParser()).use(createTodoMiddleware()).use(httpTodoException())
