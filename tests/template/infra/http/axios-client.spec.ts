import { type HttpGetClient } from '@/template/infra/http'
import axios from 'axios'

jest.mock('axios')

class AxiosHttpClient implements HttpGetClient {
  async get<T = any>(args: HttpGetClient.Params): Promise<T> {
    return axios.get(args.url, { params: args.params })
  }
}

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let fakeAxios: jest.Mocked<typeof axios>
  let url: string
  let params: object

  beforeAll(() => {
    url = 'any_url'
    params = {
      any: 'any'
    }
    fakeAxios = axios as jest.Mocked<typeof axios>
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  describe('get', () => {
    it('Should call axios.get with correct values', async () => {
      await sut.get({ url, params })

      expect(fakeAxios.get).toHaveBeenCalledWith(url, { params })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })
  })
})
