export class ConnectionNotFoundError extends Error {
  constructor () {
    super()
    this.name = 'ConnectionNotFoundError'
    this.message = 'Connection not found'
  }
}
