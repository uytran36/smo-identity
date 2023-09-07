import { load } from 'dotenv'

type Env = {
   API_PORT?: string
   API_NAME?: string
   API_PUBLIC_PATHS?: string
   DB_URL?: string
   DB_HOST?: string
   DB_PORT?: string
   DB_NAME?: string
   JWT_ALG?: string
   JWT_SECRET?: string
   JWT_AT_EXP?: string
   JWT_RT_EXP?: string
}

const env: Env = await load()

const Config = {
   SERVER: {
      PORT: Number(env.API_PORT || 3000),
      NAME: env.API_NAME || 'SMO-Identity',
      PUBLIC_PATHS: (env.API_PUBLIC_PATHS || '').split(','),
   },
   DB: {
      HOST: env.DB_HOST || 'localhost',
      PORT: Number(env.DB_PORT || 27017),
      NAME: env.DB_NAME || 'local_smo_identity',
      URL: env.DB_URL ||
         `mongodb://localhost:27017/local_smo_identity`,
   },
   JWT: {
      ALG: env.JWT_ALG || 'HS256',
      SECRET: env.JWT_SECRET ||
         'dfe55ae98056a40be6fda924144c0656bb19c8bbf3fe35d842efe2d1545df3e4',
      AT_EXP: env.JWT_AT_EXP || '2h',
      RT_EXP: env.JWT_RT_EXP || '60d',
   },
}

export default Config
