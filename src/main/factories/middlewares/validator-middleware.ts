import { ValidatorMiddleware } from '@/application/middlewares'
import { makeSchemaRequired } from '@/main/factories/validator'
import { createTodoSchema } from '@/application/schemas'

export const makeCreateTodoValidatorMiddleware = (): ValidatorMiddleware => {
  const schemaRequired = makeSchemaRequired(createTodoSchema)
  return new ValidatorMiddleware(schemaRequired)
}
