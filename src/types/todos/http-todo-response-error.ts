
export interface HttpTodoResponseError {
  code: number
  success: boolean
  message: string
  errors: Error[]
}
