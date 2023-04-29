import { SchemaValidator } from '@/presentation/validator'
import { SchemaFastestValidatorService } from '@/infra/validator/fastest-validator'
import Validator from 'fastest-validator'

export const makeSchemaValidator = (schema: object): SchemaValidator => {
  const validator = new Validator()
  const service = new SchemaFastestValidatorService(validator)
  return new SchemaValidator(service, schema)
}
