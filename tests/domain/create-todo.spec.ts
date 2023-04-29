import { type CreateTodo } from '@/domain/usecases'
import { mock } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'

describe('CreateTodo', () => {
  it('should call method `add` with correct parameters', async () => {
    const sut = mock<CreateTodo>()
    const params = {
      title: faker.lorem.words(3),
      description: faker.lorem.words(10)
    }
    await sut.add(params)
    expect(sut.add).toHaveBeenCalledWith(params)
    expect(sut.add).toHaveBeenCalledTimes(1)
  })
})
