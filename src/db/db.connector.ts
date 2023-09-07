import Config from '@config/env.config.ts'
import { MongoClient } from 'mongo'
import Logger from '@logger'

const { URL } = Config.DB

const client = new MongoClient()

await client.connect(URL).catch((error: Error) =>
   Logger.error(`[DB] Cannot connect to ${URL}: ${error.message}`)
)

Logger.info(`[DB] Connected to ${URL}`)

export default client
