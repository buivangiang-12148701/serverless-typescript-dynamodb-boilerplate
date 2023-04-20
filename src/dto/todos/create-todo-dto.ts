export const createTodoSchema = {
    $$strict: true,
    title: { type: "string", min: 1, max: 255 },
    description: { type: "string", min: 1, max: 1000 },
};

export class CreateTodoDto {
    constructor(public readonly title: string, public readonly description: string) {}
    static toEntity(json: any): CreateTodoDto {
        if (json.hasOwnProperty('title') && json.hasOwnProperty('description')) {
            return new CreateTodoDto(json['title'], json['description']);
        }
        console.log('CreateTodoDto: Invalid json');
        throw new Error('Invalid json');
    }

}
