import { LoadFacebookUserApi } from '@/template/data/contracts/apis'
import { HttpGetClient } from '@/template/infra/http'

export class FacebookApi {
  private readonly baseUrl = 'https://graph.facebook.com'
  constructor (private readonly httpClient: HttpGetClient, private readonly clientId: string, private readonly clientSecret: string) {}
  async loadUser (_params: LoadFacebookUserApi.Params): Promise<void> {
    await this.httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      }
    })
  }
}
