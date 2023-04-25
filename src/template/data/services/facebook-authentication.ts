import { LoadFacebookUserApi } from '@/template/data/contracts/apis'
import { FacebookAuthentication } from '@/template/domain/features'
import { AuthenticationError } from '@/template/domain/errors'
import { LoadUserAccountRepository } from '@/template/data/contracts/repository'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepository: LoadUserAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookUserApi.loadUser({ token: params.token })
    if (fbData === undefined) return new AuthenticationError()
    await this.loadUserAccountRepository.load({ email: fbData.email })
    return new AuthenticationError()
  }
}
