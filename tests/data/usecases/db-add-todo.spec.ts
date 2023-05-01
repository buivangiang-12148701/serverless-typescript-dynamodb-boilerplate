import { type CreateTodo } from '@/domain/usecases'
import { DbCreateTodo } from '@/data/usecases'
import { mock, type MockProxy } from 'jest-mock-extended'
import { type CreateTodoRepository } from '@/data/protocols'
import { faker } from '@faker-js/faker'

describe('DbCreateTodo', () => {
  let params: CreateTodo.Params
  let repoSpy: MockProxy<CreateTodoRepository>
  let sut: CreateTodo

  beforeEach(() => {
    params = {
      title: faker.lorem.words(5),
      description: faker.lorem.words(10)
    }
    repoSpy = mock()
    repoSpy.add.mockResolvedValue(true)
    sut = new DbCreateTodo(repoSpy)
  })
  it('should call method "add" of repository', async () => {
    await sut.add(params)
    expect(repoSpy.add).toHaveBeenCalledTimes(1)
  })
  it('should returns true if repository created successfully', async () => {
    const result = await sut.add(params)
    expect(result).toBeTruthy()
  })
  it('should return false if repository created failed', async () => {
    repoSpy.add.mockResolvedValue(false)
    const result = await sut.add(params)
    expect(result).toBeFalsy()
  })
})
