import { type CreateTodo } from '@/domain/usecases'
import { mock, type MockProxy } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'

describe('CreateTodo', () => {
  let sut: MockProxy<CreateTodo>
  let params: CreateTodo.Params
  beforeAll(() => {
    params = {
      title: faker.lorem.words(3),
      description: faker.lorem.words(10)
    }
  })
  beforeEach(() => {
    sut = mock()
  })
  it('should call method `add` with correct parameters', async () => {
    await sut.add(params)
    expect(sut.add).toHaveBeenCalledWith(params)
    expect(sut.add).toHaveBeenCalledTimes(1)
  })
})
