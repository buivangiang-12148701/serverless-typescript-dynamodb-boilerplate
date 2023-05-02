import { type BuiltInMessages, type ValidationError } from 'fastest-validator'
export class FastestValidatorError implements ValidationError, Error {
  name: string
  stack: string
  field!: string
  type!: keyof BuiltInMessages | string
  message: string
  expected?: any
  actual?: any
  constructor (params: ValidationError) {
    Object.assign(this, params)
    this.name = 'ValidationError'
    this.stack = ''
    this.message = params.message ?? ''
  }

  toJSON (): Record<string, any> {
    return {
      field: this.field,
      type: this.type,
      message: this.message
    }
  }
}
