export type HttpResponse = {
  statusCode: number
  headers?: Record<string, boolean | number | string> | undefined
  multiValueHeaders?: Record<string, Array<boolean | number | string>> | undefined
  body: string
  isBase64Encoded?: boolean | undefined
}

export const created = <T = any> (data: T): HttpResponse => ({
  statusCode: 201,
  headers: {
    'Content-Type': 'application/json'
  },
  isBase64Encoded: false,
  body: JSON.stringify(data)
})
export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  headers: {
    'Content-Type': 'application/json'
  },
  isBase64Encoded: false,
  body: error.toString()
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  headers: {
    'Content-Type': 'application/json'
  },
  isBase64Encoded: false,
  body: error.toString()
})
