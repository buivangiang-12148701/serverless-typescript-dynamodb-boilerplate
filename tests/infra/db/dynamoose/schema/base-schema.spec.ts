import { baseSchema } from '@/infra/db'

describe('BaseSchema', () => {
  it('object should have the property "id", "createdAt", "updatedAt", "deletedAt", "idDeleted"', async () => {
    expect(baseSchema).toHaveProperty('id')
    expect(baseSchema).toHaveProperty('createdAt')
    expect(baseSchema).toHaveProperty('updatedAt')
    expect(baseSchema).toHaveProperty('deletedAt')
    expect(baseSchema).toHaveProperty('isDeleted')
  })
})
