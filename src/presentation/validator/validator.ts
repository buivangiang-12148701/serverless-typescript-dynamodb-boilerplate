export interface Validator<Error, Success> {
  validate: (...args: any) => Promise<Error | Success>
}
