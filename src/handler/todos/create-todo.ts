import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from "aws-lambda";
import {DynamoDB, DynamoDBClientConfig} from "@aws-sdk/client-dynamodb";
import {ContextTodo} from "../../types/todos/context-todo";
import {marshall} from "@aws-sdk/util-dynamodb";
import {HttpResponseTodoSuccess} from "../../types/todos/http-todo-response-success";
import {nanoid} from 'nanoid'
import middy from "@middy/core"
import httpJsonBodyParser from "@middy/http-json-body-parser"
import {createTodoMiddleware} from "../../middlewares/todos/create-todo-middleware";
import {httpTodoException} from "../../exceptions/todos/http-todo-exception";
let configuration: DynamoDBClientConfig = {};
if (process.env.IS_OFFLINE) {
    configuration.region = process.env.AWS_REGION;
    configuration.endpoint = process.env.ENDPOINT;
}
const client = new DynamoDB(configuration);

const createTodo = async (_event: APIGatewayProxyEvent, context: ContextTodo): Promise<APIGatewayProxyResult> => {
    const paramsPutItem = {
        RequestItems: {
            [`${process.env.DYNAMODB_TABLE_TODO}`]: [
                {
                    PutRequest: {
                        Item: marshall({
                            id: nanoid(),
                            ...context.todo
                        })
                    }
                },
            ]
        }
    };
    try {
        await client.batchWriteItem(paramsPutItem);
        const responseSuccess: HttpResponseTodoSuccess = {
            code: 200,
            success: true,
            message: "Todo successfully created.",
        }
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            isBase64Encoded: false,
            body: JSON.stringify(responseSuccess),
        };
    } catch (error) {
        console.log('show create todo error: ', error);
        const errors: Array<Error> = [];
        errors.push(
            new CreateTodoError(),
        )
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
            },
            isBase64Encoded: false,
            body: JSON.stringify(errors),
        };
    }
};


export const handler: Handler = middy(createTodo).use(httpJsonBodyParser()).use(createTodoMiddleware()).use(httpTodoException())
