import { Item } from 'dynamoose/dist/Item'

export abstract class Base extends Item {
  id!: string
  createdAt!: number
  updatedAt!: number
  deletedAt!: number
  isDeleted!: boolean
}
