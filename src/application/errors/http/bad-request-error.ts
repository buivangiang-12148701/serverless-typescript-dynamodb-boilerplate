import { type ValidationError } from 'fastest-validator'

export class BadRequestError extends Error {
  private readonly errors?: BadRequestError.Error[]
  constructor (params: BadRequestError.Params) {
    super()
    this.name = 'BadRequestError'
    this.message = params.message ?? 'Validation errors in your request'
    this.errors = params.errors ?? []
  }

  override toString (): string {
    return JSON.stringify({
      message: this.message,
      error: this.errors
    })
  }
}

export namespace BadRequestError {
  export type Error = ValidationError
  export type Params = {
    message?: string
    errors?: Error[]
  }
}
