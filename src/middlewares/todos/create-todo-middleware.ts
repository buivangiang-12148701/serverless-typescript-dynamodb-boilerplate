import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {CreateTodoDto, createTodoSchema} from "../../dto/todos/create-todo-dto";
import {ListValidateError} from "../../types/validator/validation-error";
import middy from "@middy/core";

const Validator = require("fastest-validator");

const v = new Validator();

export const createTodoMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
    const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ): Promise<void> => {
        console.log('CreateTodoMiddleware: before');
        const check = v.compile(createTodoSchema);
        console.log('Step 1: Check: ', check);
        const errors = await check(request.event.body);
        console.log('Step 2: Errors: ', errors);
        if (Array.isArray(errors) && errors.length > 0) {
            const listValidateError: ListValidateError = ListValidateError.toEntity({errors: errors});
            console.log('Step 3.1: NewErrors: ', listValidateError);
            throw listValidateError;
        }
        console.log('Step 3.2: CreateTodoDto: ')
        request.context['todo'] = CreateTodoDto.toEntity(request.event.body);
        console.log('Step 4: request.context: ', request.context['todo']);
        return;
    }
    return {
        before,
    }
}
