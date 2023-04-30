import { makeCreateTodoController } from '@/main/factories/controllers'
import { ConnectionManager } from '@/infra/db'

ConnectionManager.getInstance().connect()
export const createTodoHandler = makeCreateTodoController().handler
