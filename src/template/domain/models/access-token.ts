export class AccessToken {
  constructor (private readonly value: string) {}

  getValue (): string {
    return this.value
  }

  static get expirationInMs (): number {
    return 30 * 60 * 1000 // 30 minutes
  }
}
