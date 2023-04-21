export const createTodoSchema = {
  $$strict: true,
  title: { type: 'string', min: 1, max: 255 },
  description: { type: 'string', min: 1, max: 1000 }
}

export class CreateTodoDto {
  constructor (public readonly title: string, public readonly description: string) {}
  static toEntity (json: unknown): CreateTodoDto {
    // Check if json is Map<string, string> and has the required properties title and description
    if (typeof json === 'object' && json !== null && 'title' in json && 'description' in json) {
      const { title, description } = json as { title: string, description: string }
      // Check if title and description are strings
      if (typeof title === 'string' && typeof description === 'string') {
        return new CreateTodoDto(title, description)
      }
    }
    console.log('CreateTodoDto: Invalid json')
    throw new Error('Invalid json')
  }
}
