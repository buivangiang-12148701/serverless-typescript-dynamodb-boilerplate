import { LoadFacebookUserApi } from '@/template/data/contracts/apis'
import { FacebookAuthentication } from '@/template/domain/features'
import { AuthenticationError } from '@/template/domain/errors'
import { CRUDAccountRepository } from '@/template/data/contracts/repository'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepository: CRUDAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser({ token: params.token })
    if (fbData === undefined) return new AuthenticationError()
    const accountData = await this.userAccountRepository.load({ email: fbData.email })
    await this.userAccountRepository.saveWithFacebook({
      id: accountData?.id,
      name: accountData?.name ?? fbData.name,
      email: fbData.email,
      facebookId: fbData.facebookId
    })
    return new AuthenticationError()
  }
}
