import { cleanEnv, str, num, bool } from 'envalid'
export const Env = cleanEnv(process.env, {
  IS_OFFLINE: bool(),
  REGION: str(),
  DYNAMODB_TABLE_TODO: str(),
  DYNAMODB_PROTOCOL: str(),
  DYNAMODB_HOST: str(),
  DYNAMODB_PORT: num()
})
