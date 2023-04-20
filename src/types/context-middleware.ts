import {Context} from "aws-lambda";

export interface ContextMiddleware extends Context {
    prev?: any;
}
