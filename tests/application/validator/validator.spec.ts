import { mock, type MockProxy } from 'jest-mock-extended'
import { type Validator } from '@/application/validator'
import { faker } from '@faker-js/faker'

describe('Validator', () => {
  let params: any
  let sut: MockProxy<Validator<any, any>>

  beforeEach(() => {
    params = faker.science.chemicalElement()
    sut = mock()
  })

  it('should call validator with correct value', async () => {
    await sut.validate(params)
    expect(sut.validate).toHaveBeenCalledWith(params)
    expect(sut.validate).toHaveBeenCalledTimes(1)
  })
})
