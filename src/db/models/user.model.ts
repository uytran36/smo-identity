import client from '@db/db.connector.ts'
import { CreateIndexOptions, DropIndexOptions } from 'mongo'
import { ProviderEnum } from '@common/type.ts'

export interface UserSchema {
   _id: string
   name: string
   password?: string
   salt?: string
   email: string
   provider: ProviderEnum
   providerId?: string
   avatar?: string
   tenantId?: string
   isMaster: boolean
   isActive: boolean
   createdAt: Date
   updatedAt: Date
   expiredAt?: Date
}

const indexOpts: CreateIndexOptions = {
   indexes: [
      {
         key: {
            email: 1, // 1 for ascending order, -1 for descending order
         },
         name: "email_unique",
         unique: true, // This makes the 'email' field unique
      },
   ],
}

export const User = client.database().collection<UserSchema>('users')
await User.createIndexes(indexOpts)
// const dropIndexOpts: DropIndexOptions = {
//    index: 'uq_email'
// }
// await User.dropIndexes(dropIndexOpts)

