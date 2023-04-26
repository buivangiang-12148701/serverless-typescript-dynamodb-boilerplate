import { AxiosHttpClient } from '@/template/infra/http'
import axios from 'axios'

jest.mock('axios')

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
    fakeAxios.get.mockResolvedValue({ status: 200, data: 'any_data' })
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

    it('Should return data on success', async () => {
      const result = await sut.get({ url, params })

      expect(result).toEqual('any_data')
    })

    it('Should rethrow if get throws', async () => {
      fakeAxios.get.mockRejectedValueOnce(new Error('http_error'))

      const promise = sut.get({ url, params })

      await expect(promise).rejects.toThrow(new Error('http_error'))
    })
  })
})
