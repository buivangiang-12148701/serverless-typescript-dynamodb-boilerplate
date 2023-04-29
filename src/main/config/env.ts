import { cleanEnv, str, num, bool } from 'envalid'
export const Env = cleanEnv(process.env, {
  IS_OFFLINE: bool({ default: false }),
  REGION: str({ default: 'us-east-1' }),
  DYNAMODB_TABLE_TODO: str({ default: 'todos' }),
  DYNAMODB_PROTOCOL: str({ default: 'http' }),
  DYNAMODB_HOST: str({ default: 'localhost' }),
  DYNAMODB_PORT: num({ default: 8000 })
})
