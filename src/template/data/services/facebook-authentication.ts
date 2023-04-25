import { LoadFacebookUserApi } from '@/template/data/contracts/apis'
import { FacebookAuthentication } from '@/template/domain/features'
import { AuthenticationError } from '@/template/domain/errors'
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '@/template/data/contracts/repository'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRepository & CreateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser({ token: params.token })
    if (fbData === undefined) return new AuthenticationError()
    await this.userAccountRepository.load({ email: fbData.email })
    await this.userAccountRepository.createFromFacebook(fbData)
    return new AuthenticationError()
  }
}
