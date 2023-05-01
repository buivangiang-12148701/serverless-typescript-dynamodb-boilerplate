export class ConnectionNameExistsError extends Error {
  constructor () {
    super()
    this.name = 'ConnectionNameExistsError'
    this.message = 'Connection name already exists'
  }
}
