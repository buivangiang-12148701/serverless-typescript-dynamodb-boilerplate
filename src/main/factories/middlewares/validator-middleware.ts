import { ValidatorMiddleware } from '@/presentation/middlewares'
import { makeSchemaValidator } from '@/main/factories/validator'
import { addTodoSchema } from '@/presentation/schemas'

export const makeCreateTodoValidatorMiddleware = (): ValidatorMiddleware => {
  const schemaValidator = makeSchemaValidator(addTodoSchema)
  return new ValidatorMiddleware(schemaValidator)
}
