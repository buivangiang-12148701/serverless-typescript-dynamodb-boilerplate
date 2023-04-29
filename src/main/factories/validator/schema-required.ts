import Validator from 'fastest-validator'
import { SchemaFastestValidatorAdapter } from '@/infra/validator'
import { SchemaRequired } from '@/presentation/validator'

export const makeSchemaRequired = (schema: object): SchemaRequired => {
  const validator = new Validator()
  const service = new SchemaFastestValidatorAdapter(validator)
  return new SchemaRequired(service, schema)
}
