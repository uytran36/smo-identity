import client from '@db/db.connector.ts'
import { CreateIndexOptions } from 'mongo'

interface IntegrationSchema {
   _id: string
   name: string
   tenantId: string
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

export const Integration = client.database().collection<IntegrationSchema>(
   'integrations',
)

await Integration.createIndexes(indexOpts)
