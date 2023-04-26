import { type TokenGenerator } from '@/template/data/contracts/cryptos'
import { sign } from 'jsonwebtoken'

jest.mock('jsonwebtoken')

class JwtTokenGenerator {
  constructor (private readonly secret: string) {}
  async generateToken (params: TokenGenerator.Params): Promise<void> {
    const expirationInSeconds = params.expirationInMs / 1000
    sign({ key: params.key }, this.secret, { expiresIn: expirationInSeconds })
  }
}

describe('JwtTokenGenerator', () => {
  it('Should call sign with correct params', async () => {
    const fakeSign = sign as jest.MockedFunction<typeof sign>
    const sut = new JwtTokenGenerator('any_secret')

    await sut.generateToken({
      key: 'any_key',
      expirationInMs: 1000
    })

    expect(fakeSign).toHaveBeenCalledWith({ key: 'any_key' }, 'any_secret', { expiresIn: 1 })
    expect(fakeSign).toHaveBeenCalledTimes(1)
  })
})
