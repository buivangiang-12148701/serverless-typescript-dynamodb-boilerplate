export interface BuiltInMessages {
  /**
     * The '{field}' field is required.
     */
  required?: string
  /**
     * The '{field}' field must be a string.
     */
  string?: string
  /**
     * The '{field}' field must not be empty.
     */
  stringEmpty?: string
  /**
     * The '{field}' field length must be greater than or equal to {expected} characters long.
     */
  stringMin?: string
  /**
     * The '{field}' field length must be less than or equal to {expected} characters long.
     */
  stringMax?: string
  /**
     * The '{field}' field length must be {expected} characters long.
     */
  stringLength?: string
  /**
     * The '{field}' field fails to match the required pattern.
     */
  stringPattern?: string
  /**
     * The '{field}' field must contain the '{expected}' text.
     */
  stringContains?: string
  /**
     * The '{field}' field does not match any of the allowed values.
     */
  stringEnum?: string
  /**
     * The '{field}' field must be a numeric string.
     */
  stringNumeric?: string
  /**
     * The '{field}' field must be an alphabetic string.
     */
  stringAlpha?: string
  /**
     * The '{field}' field must be an alphanumeric string.
     */
  stringAlphanum?: string
  /**
     * The '{field}' field must be an alphadash string.
     */
  stringAlphadash?: string

  /**
     * The '{field}' field must be a number.
     */
  number?: string
  /**
     * The '{field}' field must be greater than or equal to {expected}.
     */
  numberMin?: string
  /**
     * The '{field}' field must be less than or equal to {expected}.
     */
  numberMax?: string
  /**
     * The '{field}' field must be equal with {expected}.
     */
  numberEqual?: string
  /**
     * The '{field}' field can't be equal with {expected}.
     */
  numberNotEqual?: string
  /**
     * The '{field}' field must be an integer.
     */
  numberInteger?: string
  /**
     * The '{field}' field must be a positive number.
     */
  numberPositive?: string
  /**
     * The '{field}' field must be a negative number.
     */
  numberNegative?: string

  /**
     * The '{field}' field must be an array.
     */
  array?: string
  /**
     * The '{field}' field must not be an empty array.
     */
  arrayEmpty?: string
  /**
     * The '{field}' field must contain at least {expected} items.
     */
  arrayMin?: string
  /**
     * The '{field}' field must contain less than or equal to {expected} items.
     */
  arrayMax?: string
  /**
     * The '{field}' field must contain {expected} items.
     */
  arrayLength?: string
  /**
     * The '{field}' field must contain the '{expected}' item.
     */
  arrayContains?: string
  /**
     * The '{field} field value '{expected}' does not match any of the allowed values.
     */
  arrayEnum?: string

  /**
     * The '{field}' field must be a boolean.
     */
  boolean?: string

  /**
     * The '{field}' field must be a Date.
     */
  date?: string
  /**
     * The '{field}' field must be greater than or equal to {expected}.
     */
  dateMin?: string
  /**
     * The '{field}' field must be less than or equal to {expected}.
     */
  dateMax?: string

  /**
     * The '{field}' field value '{expected}' does not match any of the allowed values.
     */
  enumValue?: string

  /**
     * The '{field}' field value must be equal to '{expected}'.
     */
  equalValue?: string
  /**
     * The '{field}' field value must be equal to '{expected}' field value.
     */
  equalField?: string

  /**
     * The '{field}' field is forbidden.
     */
  forbidden?: string

  /**
     * The '{field}' field must be a function.
     */
  function?: string

  /**
     * The '{field}' field must be a valid e-mail.
     */
  email?: string

  /**
     * The '{field}' field must be a valid checksum luhn.
     */
  luhn?: string

  /**
     * The '{field}' field must be a valid MAC address.
     */
  mac?: string

  /**
     * The '{field}' must be an Object.
     */
  object?: string
  /**
     * The object '{field}' contains forbidden keys: '{actual}'.
     */
  objectStrict?: string

  /**
     * The '{field}' field must be a valid URL.
     */
  url?: string

  /**
     * The '{field}' field must be a valid UUID.
     */
  uuid?: string
  /**
     * The '{field}' field must be a valid UUID version provided.
     */
  uuidVersion?: string
}

/**
 * Type with description of custom error messages
 */
export type MessagesType = BuiltInMessages & Record<string, string>
export class ValidationError extends Error {
  readonly name: string
  type: keyof BuiltInMessages | string
  readonly field?: string
  readonly message: string
  readonly expected?: any
  readonly actual?: any

  constructor (type: keyof BuiltInMessages | string, message: string, field: string, actual: any) {
    super()
    this.name = 'ValidationError'
    this.type = type
    this.message = message
    this.field = field
    this.actual = actual
  }

  static toEntity (json: unknown): ValidationError {
    if (typeof json === 'object' && json !== null && 'type' in json && 'message' in json) {
      const { type, message, field, actual } = json as { type: string, message: string, field: string, actual: any }
      return new ValidationError(type, message, field, actual)
    }
    console.log('ValidationError: Invalid json')
    throw new Error('Invalid json')
  }
}

export class ListValidateError extends Error {
  readonly name: string
  readonly message: string
  readonly errors: ValidationError[]

  constructor (errors: ValidationError[]) {
    super()
    this.name = 'ListValidateError'
    this.message = 'List of validation errors'
    this.errors = errors
  }

  static toEntity (json: unknown): ListValidateError | Error {
    if (typeof json === 'object' && json !== null && 'errors' in json) {
      const { errors } = json as { errors: ValidationError[] }
      return new ListValidateError(errors.map(ValidationError.toEntity))
    }
    console.log('ListValidateError: Invalid json')
    return new Error('Invalid json')
  }
}
