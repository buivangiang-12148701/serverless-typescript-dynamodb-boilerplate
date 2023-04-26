import { type LoadFacebookUserApi } from '@/template/data/contracts/apis'
import { type FacebookAuthentication } from '@/template/domain/features'
import { AuthenticationError } from '@/template/domain/errors'
import { type LoadUserAccountRepository, type SaveFacebookAccountRepository } from '@/template/data/contracts/repository'
import { AccessToken, FacebookAccount } from '@/template/domain/models'
import { type TokenGenerator } from '@/template/data/contracts/cryptos'

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRepository & SaveFacebookAccountRepository,
    private readonly crypto: TokenGenerator
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const fbData = await this.facebookApi.loadUser({ token: params.token })
    if (fbData === undefined) return new AuthenticationError()
    const accountData = await this.userAccountRepository.load({ email: fbData.email })
    const fbAccount = new FacebookAccount(fbData, accountData)
    const { id } = await this.userAccountRepository.saveWithFacebook(fbAccount)
    const newToken = await this.crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
    return new AccessToken(newToken)
  }
}
