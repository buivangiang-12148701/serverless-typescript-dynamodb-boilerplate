import { nanoid } from 'nanoid'
import { getUnixTime } from 'date-fns'

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
