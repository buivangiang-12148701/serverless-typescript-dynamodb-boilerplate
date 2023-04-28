import { Connection } from '@/infra/db/dynamoose/helpers'
import { makeCreateTodoHandler } from '@/main/factories/handlers'

Connection.getInstances().connect()
export const createTodoHandler = makeCreateTodoHandler().handler
