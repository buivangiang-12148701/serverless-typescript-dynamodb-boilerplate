export class AuthenticationError extends Error {
  constructor () {
    super('Facebook authentication error')
    this.name = 'AuthenticationError'
  }
}
