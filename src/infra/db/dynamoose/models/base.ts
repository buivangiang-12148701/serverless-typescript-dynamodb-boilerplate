import { Item } from 'dynamoose/dist/Item'
import { getUnixTime } from 'date-fns'
import { nanoid } from 'nanoid'
export abstract class Base extends Item {
  id!: string
  createdAt!: number
  updatedAt!: number
  deletedAt!: number
  isDeleted!: boolean
}

export const baseSchema = {
  id: {
    type: String,
    hashKey: true,
    default: nanoid()
  },
  createdAt: {
    type: Number,
    default: getUnixTime(new Date())
  },
  updatedAt: {
    type: Number,
    default: getUnixTime(new Date())
  },
  deletedAt: {
    type: Number,
    default: getUnixTime(new Date())
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}
