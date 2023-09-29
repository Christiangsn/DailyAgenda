import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { ENVIROMENT } from 'config/enviroment'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  void app.enableCors()
  void await app.listen(ENVIROMENT.PORT)

  Logger.log(`Server is running on ${ENVIROMENT.PORT} 🚀🚀`)
}
bootstrap()
