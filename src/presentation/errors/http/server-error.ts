export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. Try again soon')
    this.name = 'ServerError'
    this.message = 'The server is up, but overloaded with requests. Try again later!'
    this.stack = error?.stack
  }

  override toString (): string {
    return JSON.stringify({
      message: this.message
    })
  }
}
