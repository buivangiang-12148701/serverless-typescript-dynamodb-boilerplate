import { LoadFacebookUserApi } from '@/template/data/contracts/apis'
import { FacebookAuthentication } from '@/template/domain/features'
import { AuthenticationError } from '@/template/domain/errors'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/template/data/contracts/repository'
import { FacebookAccount } from '@/template/domain/models'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRepository & SaveFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser({ token: params.token })
    if (fbData === undefined) return new AuthenticationError()
    const accountData = await this.userAccountRepository.load({ email: fbData.email })
    const fbAccount = new FacebookAccount(fbData, accountData)
    await this.userAccountRepository.saveWithFacebook(fbAccount)
    return new AuthenticationError()
  }
}
