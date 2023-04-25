import { AccessToken } from '@/template/domain/models'
import { AuthenticationError } from '@/template/domain/errors'

export interface FacebookAuthentication {
  perform: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

namespace FacebookAuthentication {
  export type Params = {
    token: string
  }
  export type Result = AccessToken | AuthenticationError
}
