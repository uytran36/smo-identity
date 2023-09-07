import client from '@db/db.connector.ts'
import { CreateIndexOptions } from 'mongo'

interface TenantSchema {
   _id: string
   name: string
   createdAt: Date
   updatedAt: Date
}

const indexOpts: CreateIndexOptions = {
   indexes: [
      {
         key: {
            name: 'text',
         },
         unique: true,
         name: 'uq_name',
      },
   ],
}

export const Tenant = client.database().collection<TenantSchema>('tenants')
await Tenant.createIndexes(indexOpts)
