import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import middy from "@middy/core";
import {HttpTodoResponseError} from "../../types/todos/http-todo-response-error";
import {ListValidateError} from "../../types/validator/validation-error";

export const httpTodoException = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
    const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ): Promise<void> => {
        console.log('HttpTodoException: onError');
        if(request.error instanceof ListValidateError) {
            console.log('Step 1: ListValidateError: ', request.error);
            const errorData: HttpTodoResponseError = {
                code: 400,
                success: false,
                message: 'Validation failed',
                errors: request.error.errors,
            }
            console.log('Step 2: Response: ', errorData);
            request.response = {
                statusCode: 400,
                isBase64Encoded: false,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(errorData),
            }
        }
        return;
    }
    return {
        onError,
    }
}
