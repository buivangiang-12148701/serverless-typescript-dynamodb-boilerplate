import { badRequest, created, type HttpResponse, serverError } from '@/application/helpers'

describe('http helper', () => {
  describe('created', () => {
    it('should return a 201 status code and JSON body', async () => {
      const data = { message: 'Created successfully' }
      const response: HttpResponse = created(data)

      expect(response.statusCode).toBe(201)
      expect(response.headers).toEqual({ 'Content-Type': 'application/json' })
      expect(response.isBase64Encoded).toBeFalsy()
      expect(response.body).toEqual(JSON.stringify(data))
    })
  })

  describe('serverError', () => {
    it('should return a 500 status code and JSON body', async () => {
      const error = new Error('any_error')
      const response: HttpResponse = serverError(error)

      expect(response.statusCode).toBe(500)
      expect(response.headers).toEqual({ 'Content-Type': 'application/json' })
      expect(response.isBase64Encoded).toBeFalsy()
      expect(response.body).toEqual(error.toString())
    })
  })

  describe('badRequest', () => {
    it('should return a 400 status code and JSON body', async () => {
      const error = new Error('any_error')
      const response = badRequest(error)

      expect(response.statusCode).toBe(400)
      expect(response.headers).toEqual({ 'Content-Type': 'application/json' })
      expect(response.isBase64Encoded).toBeFalsy()
      expect(response.body).toEqual(error.toString())
    })
  })
})
