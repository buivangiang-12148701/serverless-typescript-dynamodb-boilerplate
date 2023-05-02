import { type CreateTodo } from '@/domain/usecases'
import { type Middleware } from '@/application/middlewares'
import { type Callback } from 'aws-lambda'
import { type EventJSON } from '@/main/types'
import { type Controller, CreateTodoController } from '@/application/controllers'
import { mock, type MockProxy } from 'jest-mock-extended'
import { created, serverError } from '@/application/helpers/http'

jest.mock('@/application/helpers/http', () => {
  return {
    created: jest.fn(),
    serverError: jest.fn()
  }
})

describe('CreateTodoController', () => {
  let createTodoSpy: MockProxy<CreateTodo>
  let validatorMiddlewareSpy: MockProxy<Middleware>
  let event: EventJSON
  let context: any
  let callback: Callback
  let createdSpy: jest.Mock
  let serverErrorSpy: jest.Mock
  let sut: Controller

  beforeEach(() => {
    event = {
      body: {
        title: 'Test Todo',
        description: 'Test description'
      }
    } as unknown as EventJSON

    context = {}
    callback = jest.fn()
    createTodoSpy = mock()
    validatorMiddlewareSpy = mock()
    createdSpy = jest.fn()
    serverErrorSpy = jest.fn()
    jest.mocked(created).mockImplementation(createdSpy)
    jest.mocked(serverError).mockImplementation(serverErrorSpy)
    sut = new CreateTodoController(createTodoSpy, validatorMiddlewareSpy)
  })

  it('should return a successful response when todo is created', async () => {
    // Arrange
    createTodoSpy.add.mockResolvedValue(true)

    // Act
    await sut.perform(event, context, callback)

    // Assert
    expect(createdSpy).toHaveBeenCalledTimes(1)
  })

  it('should return a server error when todo creation fails', async () => {
    // Arrange
    createTodoSpy.add.mockResolvedValue(false)
    // Act
    await sut.perform(event, context, callback)

    // Assert
    expect(serverErrorSpy).toHaveBeenCalledTimes(1)
  })
  //
  it('should return a server error when an exception occurs', async () => {
    // Arrange
    createTodoSpy.add.mockRejectedValue(new Error('Test error'))

    // Act
    await sut.perform(event, context, callback)

    // Assert
    expect(serverErrorSpy).toHaveBeenCalledTimes(1)
  })
})
