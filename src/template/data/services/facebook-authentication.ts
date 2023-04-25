import { LoadFacebookUserApi } from '@/template/data/contracts/apis'
import { FacebookAuthentication } from '@/template/domain/features'
import { AuthenticationError } from '@/template/domain/errors'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/template/data/contracts/repository'
import { AccessToken, FacebookAccount } from '@/template/domain/models'
import { TokenGenerator } from '@/template/data/contracts/cryptos'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRepository & SaveFacebookAccountRepository,
    private readonly crypto: TokenGenerator
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser({ token: params.token })
    if (fbData === undefined) return new AuthenticationError()
    const accountData = await this.userAccountRepository.load({ email: fbData.email })
    const fbAccount = new FacebookAccount(fbData, accountData)
    const { id } = await this.userAccountRepository.saveWithFacebook(fbAccount)
    await this.crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
    return new AuthenticationError()
  }
}
