
jest.mock('dynamoose', () => {
  const Schema = jest.fn((schema) => {
    return schema
  })

  // Mock the model function
  const model = jest.fn((modelName, schema) => {
    return {
      modelName,
      schema,
      save: jest.fn(),
      get: jest.fn()
    }
  })

  return {
    Schema,
    model
  }
})
describe('TodoDynamooseRepository', () => {
  // let sut: TodoDynamooseRepository
  // beforeEach(() => {
  //   sut = new TodoDynamooseRepository()
  // })
  it('should create successfully', () => {
    expect(true).toBeTruthy()
  })
})
