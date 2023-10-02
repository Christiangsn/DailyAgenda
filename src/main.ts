import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { ENVIROMENT } from 'config/enviroment'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  void app.enableCors()

  Logger.log(`envPath: ${ENVIROMENT.envPath()}`)
  Logger.log(`STRING_CONNECTION: ${ENVIROMENT.STRING_CONNECTION}`)
  Logger.log(`MONGO_DATABASE_NAME: ${ENVIROMENT.MONGO_DATABASE_NAME}`)
  Logger.log(`Server is running on ${ENVIROMENT.PORT} 🚀🚀`)

  void await app.listen(ENVIROMENT.PORT)
}
bootstrap()
