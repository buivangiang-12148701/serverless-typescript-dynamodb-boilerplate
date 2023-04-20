class CreateTodoError implements Error {
    message: string;
    name: string;
  constructor(message?: string) {
    this.name = 'CreateTodoError';
    this.message = message ?? 'Insert todo error';
  }

  toString(): string {
      return this.message;
  }
}
