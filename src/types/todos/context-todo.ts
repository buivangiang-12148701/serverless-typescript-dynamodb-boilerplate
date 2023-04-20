import {Context} from "aws-lambda";
import {CreateTodoDto} from "../../dto/todos/create-todo-dto";

export interface ContextTodo extends Context {
    todo: CreateTodoDto;
}
