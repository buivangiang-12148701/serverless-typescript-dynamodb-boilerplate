import Validator from 'fastest-validator'
import { createTodoSchema } from '@/presentation/schemas'

const validator = new Validator()

describe('createTodoSchema', () => {
  it('should pass with valid data', () => {
    const validData = {
      title: 'Sample Title',
      description: 'Sample Description'
    }

    const validationResult = validator.validate(validData, createTodoSchema)
    expect(validationResult).toBe(true)
  })

  it('should fail with missing title', () => {
    const invalidData = {
      description: 'Sample Description'
    }

    const validationResult = validator.validate(invalidData, createTodoSchema)
    expect(validationResult).toMatchObject([
      {
        type: 'required',
        field: 'title',
        message: 'The \'title\' field is required.'
      }
    ])
  })

  it('should fail with missing description', () => {
    const invalidData = {
      title: 'Sample Title'
    }

    const validationResult = validator.validate(invalidData, createTodoSchema)
    expect(validationResult).toMatchObject([
      {
        type: 'required',
        field: 'description',
        message: 'The \'description\' field is required.'
      }
    ])
  })

  it('should fail with wrong title type', () => {
    const invalidData = {
      title: 123,
      description: 'Sample Description'
    }

    const validationResult = validator.validate(invalidData, createTodoSchema)
    expect(validationResult).toMatchObject([
      {
        type: 'string',
        field: 'title',
        message: 'The \'title\' field must be a string.'
      }
    ])
  })

  it('should fail with wrong description type', () => {
    const invalidData = {
      title: 'Sample Title',
      description: 123
    }

    const validationResult = validator.validate(invalidData, createTodoSchema)
    expect(validationResult).toMatchObject([
      {
        type: 'string',
        field: 'description',
        message: 'The \'description\' field must be a string.'
      }
    ])
  })
})
