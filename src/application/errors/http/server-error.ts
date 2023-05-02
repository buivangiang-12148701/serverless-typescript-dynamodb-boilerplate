export class ServerError extends Error {
  constructor () {
    super('Server failed. Try again soon')
    this.name = 'ServerError'
    this.message = 'Something is broken. Try again soon'
  }

  override toString (): string {
    return JSON.stringify({
      message: this.message
    })
  }
}
