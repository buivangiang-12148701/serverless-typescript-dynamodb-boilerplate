import { get } from '@/application/helpers'

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

    it('returns the correct value for a given path', () => {
      const result = get(obj, 'a.b.c')
      expect(result).toBe(1)
    })

    it('returns the default value when the path is not found', () => {
      const result = get(obj, 'a.b.e', 'default')
      expect(result).toBe('default')
    })

    it('handles arrays in the object', () => {
      const result = get(obj, 'a.d[1]')
      expect(result).toBe(2)
    })

    it('handles nested objects', () => {
      const result = get(obj, 'a.b')
      expect(result).toEqual({ c: 1 })
    })
  })
})
