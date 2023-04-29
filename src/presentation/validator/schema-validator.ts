import { type Validator } from '@/presentation/validator/validator'
import { type SchemaValidatorService } from '@/data/protocols/validator'

export class SchemaValidator implements Validator<Error[], boolean> {
  constructor (private readonly service: SchemaValidatorService, readonly schema: object) {}

  async validate (value: object): Promise<Error[] | boolean > {
    return this.service.validate({ schema: this.schema, value })
  }
}
