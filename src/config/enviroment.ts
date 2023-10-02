/* eslint-disable @typescript-eslint/no-unused-vars */
import dotenv from 'dotenv'
import { join } from 'path'

const envPath = (): string => {
  const env = process.env.NODE_ENV
  let returnPathEnv: string = join(__dirname, '../../.env')

  // Estrutura de mapeamento de env
  switch (env) {
    case 'qas':
      returnPathEnv = '../../.env.qas'
      break
    case 'production':
      returnPathEnv = '../../.env.production'
      break
    default:
      returnPathEnv = join(__dirname, '../../.env')
  }

  return returnPathEnv
}

void dotenv.config({ path: envPath() })
export const ENVIROMENT = {
  /**
   * Verify that the environment
   */
  envPath,
  /**
   * @info PORT
   */
  PORT: process.env.PORT ?? '4000',
  /**
   * @info TOKEN EXPERIKES
   * @info one token is valid for 1 day
   */
  TOKEN_EXPERIES: process.env?.EXPERIES_TOKEN ?? '1440',
  /**
   * @info `String connection to database`
   */
  STRING_CONNECTION: process.env.STRING_CONNECTION ?? '',
  MONGO_DATABASE_NAME: process.env.MONGO_DATABASE_NAME ?? 'dbteste'
}
