export interface CreateTodo {
  add: (params: CreateTodo.Params) => Promise<CreateTodo.Result>
}

export namespace CreateTodo {
  export type Params = {
    title: string
    description: string
  }

  export type Result = boolean
}
