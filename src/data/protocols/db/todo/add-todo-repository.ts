export interface AddTodoRepository {
  add: (data: AddTodoRepository.Params) => Promise<AddTodoRepository.Result>
}

export namespace AddTodoRepository {
  export type Params = {
    title: string
    description: string
  }

  export type Result = boolean
}
