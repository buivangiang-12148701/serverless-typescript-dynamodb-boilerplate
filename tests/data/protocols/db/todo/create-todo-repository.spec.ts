import { mock, type MockProxy } from 'jest-mock-extended'
import { type CreateTodoRepository } from '@/data/protocols'
import { faker } from '@faker-js/faker'

describe('CreateTodoRepository', () => {
  let params: CreateTodoRepository.Params
  let sut: MockProxy<CreateTodoRepository>

  beforeEach(() => {
    params = {
      title: faker.lorem.words(5),
      description: faker.lorem.words(10)
    }
    sut = mock()
  })
  it('should call method add with correct parameters', async () => {
    await sut.add(params)
    expect(sut.add).toBeCalledWith(params)
    expect(sut.add).toBeCalledTimes(1)
  })
})
