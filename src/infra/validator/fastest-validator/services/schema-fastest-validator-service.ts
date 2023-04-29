import { FastestValidatorError } from '@/presentation/errors/validator'
import type { ValidationError } from 'fastest-validator'
import type Validator from 'fastest-validator'
import { type SchemaValidatorService } from '@/data/protocols/validator'
export class SchemaFastestValidatorService implements SchemaValidatorService {
  constructor (private readonly validator: Validator) {
  }

  async validate (params: SchemaValidatorService.Params): Promise<SchemaValidatorService.Result> {
    const check = this.validator.compile(params.schema)
    const errors = await check(params.value)
    if (Array.isArray(errors)) {
      return this.transformNormalizedError(errors)
    }
    return errors
  }

  private transformNormalizedError (errors: ValidationError[]): FastestValidatorError[] {
    return errors.map(item => new FastestValidatorError(item))
  }
}
