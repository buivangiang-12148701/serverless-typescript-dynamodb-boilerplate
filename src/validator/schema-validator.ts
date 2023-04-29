export interface SchemaValidator {
  validate: (params: SchemaValidator.Params) => Promise<SchemaValidator.Result>
}

export namespace SchemaValidator {
  export type Params = {
    schema: object
    value: object
  }
  export type Result = Error[] | boolean
}
