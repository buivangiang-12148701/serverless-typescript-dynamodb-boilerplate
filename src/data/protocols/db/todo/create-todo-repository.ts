export interface CreateTodoRepository {
  add: (data: CreateTodoRepository.Params) => Promise<CreateTodoRepository.Result>
}

export namespace CreateTodoRepository {
  export type Params = {
    title: string
    description: string
  }

  export type Result = boolean
}
