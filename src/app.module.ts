import { ENVIROMENT } from '@config/enviroment'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from '@user/infra/user.module'

@Module({
  imports: [
    MongooseModule.forRoot(ENVIROMENT.STRING_CONNECTION, {
      dbName: ENVIROMENT.MONGO_DATABASE_NAME
    }),
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {};
