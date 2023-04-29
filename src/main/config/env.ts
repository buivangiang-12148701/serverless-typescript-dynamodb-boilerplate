import { cleanEnv, str, num, bool } from 'envalid'
export const Env = cleanEnv(process.env, {
  IS_OFFLINE: bool() ?? false,
  REGION: str(),
  DYNAMODB_TABLE_TODO: str(),
  DYNAMODB_PROTOCOL: str() ?? 'http',
  DYNAMODB_HOST: str() ?? 'localhost',
  DYNAMODB_PORT: num() ?? 8000
})
