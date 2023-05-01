import { get } from '@/presentation/helpers'

describe('util helper', () => {
  describe('get', () => {
    const obj = {
      a: {
        b: {
          c: 1
        },
        d: [1, 2, 3]
      }
    }

    test('returns the correct value for a given path', () => {
      const result = get(obj, 'a.b.c')
      expect(result).toBe(1)
    })

    test('returns the default value when the path is not found', () => {
      const result = get(obj, 'a.b.e', 'default')
      expect(result).toBe('default')
    })

    test('handles arrays in the object', () => {
      const result = get(obj, 'a.d[1]')
      expect(result).toBe(2)
    })

    test('handles nested objects', () => {
      const result = get(obj, 'a.b')
      expect(result).toEqual({ c: 1 })
    })
  })
})
