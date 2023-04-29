export interface SchemaValidatorService {
  validate: (params: SchemaValidatorService.Params) => Promise<SchemaValidatorService.Result>
}

export namespace SchemaValidatorService {
  export type Params = {
    schema: object
    value: object
  }
  export type Result = Error[] | boolean
}
