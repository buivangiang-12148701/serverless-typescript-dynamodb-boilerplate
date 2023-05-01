import { Env } from '@/main/config'
import { cleanEnv } from 'envalid'

jest.mock('envalid', () => {
  return {
    cleanEnv: jest.fn(),
    bool: jest.fn(() => ({
      default: false
    })),
    str: jest.fn(() => ({
      default: ''
    })),
    port: jest.fn(() => ({
      default: 3000
    }))
  }
})
describe('Env', () => {
  let sut: Env
  let cleanEnvSpy: jest.Mock
  beforeEach(() => {
    sut = Env.getInstance()
    cleanEnvSpy = jest.fn()
    jest.mocked(cleanEnv).mockImplementation(cleanEnvSpy)
    cleanEnvSpy.mockImplementation((_env: any, _validators: any) => {
      return {
        IS_OFFLINE: true
      }
    })
  })

  it('should have only one instance', async () => {
    const sut2 = Env.getInstance()
    expect(sut).toBe(sut2)
  })

  it('getEnv method should call cleanEnv to verify environment', async () => {
    Env.getInstance().getEnv()
    expect(cleanEnv).toHaveBeenCalledTimes(1)
  })
  it('getEnv method should return correct value if cleanEnv return correct value', async () => {
    const env = Env.getInstance().getEnv()
    expect(env).toEqual({
      IS_OFFLINE: true
    })
  })
})
