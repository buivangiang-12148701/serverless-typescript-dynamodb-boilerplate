import { type HttpGetClient } from '@/template/infra/http'
import axios from 'axios'

jest.mock('axios')

class AxiosHttpClient implements HttpGetClient {
  async get<T = any>(args: HttpGetClient.Params): Promise<T> {
    return axios.get(args.url, { params: args.params })
  }
}

describe('AxiosHttpClient', () => {
  describe('get', () => {
    it('Should call axios.get with correct values', async () => {
      const fakeAxios = axios as jest.Mocked<typeof axios>
      const sut = new AxiosHttpClient()

      await sut.get({
        url: 'any_url',
        params: {
          any: 'any'
        }
      })

      expect(fakeAxios.get).toHaveBeenCalledWith('any_url', {
        params: {
          any: 'any'
        }
      })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })
  })
})
