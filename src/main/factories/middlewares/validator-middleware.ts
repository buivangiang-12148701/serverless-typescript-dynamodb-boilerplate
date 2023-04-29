import { ValidatorMiddleware } from '@/presentation/middlewares'
import { makeSchemaValidator } from '@/main/factories/validator'
import { createTodoSchema } from '@/presentation/schemas'

export const makeCreateTodoValidatorMiddleware = (): ValidatorMiddleware => {
  const schemaValidator = makeSchemaValidator(createTodoSchema)
  return new ValidatorMiddleware(schemaValidator)
}
