import { Connection } from '@/infra/db/dynamoose/helpers'
import { makeCreateTodoController } from '@/main/factories/controllers'

Connection.getInstances().connect()
export const createTodoHandler = makeCreateTodoController().handler
