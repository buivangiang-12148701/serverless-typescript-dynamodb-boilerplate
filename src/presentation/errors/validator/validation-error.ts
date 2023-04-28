import { type BuiltInMessages, type ValidationError } from 'fastest-validator'
export class ValidationErrorImpl implements ValidationError {
  field!: string
  type!: keyof BuiltInMessages | string
  message?: string
  expected?: any
  actual?: any
  constructor (params: ValidationError) {
    Object.assign(this, params)
  }

  toString (): string {
    return JSON.stringify({
      field: this.field,
      type: this.type,
      message: this.message
    })
  }
}
