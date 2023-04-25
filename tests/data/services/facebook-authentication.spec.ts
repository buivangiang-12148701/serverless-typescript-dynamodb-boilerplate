import { AuthenticationError } from '@/template/domain/errors'
import { FacebookAuthenticationService } from '@/template/data/services'
import { LoadFacebookUserApi } from '@/template/data/contracts/apis'
import { mock, MockProxy } from 'jest-mock-extended'
import { LoadUserAccountRepository } from '@/template/data/contracts/repository'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let loadUserAccountRepository: MockProxy<LoadUserAccountRepository>
  let sut: FacebookAuthenticationService
  const token = 'any_token'
  beforeEach(() => {
    loadFacebookUserApi = mock<LoadFacebookUserApi>()
    loadFacebookUserApi.loadUser.mockResolvedValue({
      facebookId: 'any_fb_id',
      name: 'any_fb_name',
      email: 'any_fb_email'
    })
    loadUserAccountRepository = mock<LoadUserAccountRepository>()
    sut = new FacebookAuthenticationService(loadFacebookUserApi, loadUserAccountRepository)
  })

  it('Should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('Should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('Should call LoadUserByEmailRepository when LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token })

    expect(loadUserAccountRepository.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(loadUserAccountRepository.load).toHaveBeenCalledTimes(1)
  })
})
