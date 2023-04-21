export class CreateTodoError extends Error {
  message: string
  name: string
  constructor (message?: string) {
    super()
    this.name = 'CreateTodoError'
    this.message = message ?? 'Insert todo error'
  }

  toString (): string {
    return this.message
  }
}
