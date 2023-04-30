import { Env } from '@/main/config'
import { todoTableOptions } from '@/infra/db'

const mockTableOptions: & any = {
  ...todoTableOptions,
  ...{
    getTableName: () => Env.getInstance().getEnv().DYNAMODB_TABLE_TODO
  }
}

describe('Todo Table Options', () => {
  beforeAll(() => {
    jest.spyOn(Env.prototype, 'getEnv').mockReturnValue({
      DYNAMODB_TABLE_TODO: 'any_table'
    } as any)
  })
  it('should return a todo table options', async () => {
    const tableName = mockTableOptions.getTableName()
    expect(tableName).toBe('any_table')
  })
})
