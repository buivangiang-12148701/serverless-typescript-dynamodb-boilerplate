import { ValidatorMiddleware } from '@/presentation/middlewares'
import { makeSchemaRequired } from '@/main/factories/validator'
import { createTodoSchema } from '@/presentation/schemas'

export const makeCreateTodoValidatorMiddleware = (): ValidatorMiddleware => {
  const schemaRequired = makeSchemaRequired(createTodoSchema)
  return new ValidatorMiddleware(schemaRequired)
}
