import { type Validator } from '@/application/validator'
import { type SchemaFastestValidatorAdapter } from '@/infra/validator'

export class SchemaRequired implements Validator<Error[], boolean> {
  constructor (private readonly service: SchemaFastestValidatorAdapter, readonly schema: object) {}

  async validate (value: object): Promise<Error[] | boolean > {
    return this.service.validate({ schema: this.schema, value })
  }
}
