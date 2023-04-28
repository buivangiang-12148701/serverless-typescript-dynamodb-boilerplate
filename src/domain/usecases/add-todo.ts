export interface AddTodo {
  add: (params: AddTodo.Params) => Promise<AddTodo.Result>
}

export namespace AddTodo {
  export type Params = {
    title: string
    description: string
  }

  export type Result = boolean
}
