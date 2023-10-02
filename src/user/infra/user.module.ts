import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchemaFactory } from './entities/userSchema'
import { UserRepository } from './repo/userRepository'
import { JwtToken } from './crypto/jwtToken'
import { SignUpController } from './controllers/signUp.controller'
import { SignUpUseCase } from '@user/useCases/signUp/signUpUseCase'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchemaFactory }
    ])
  ],
  controllers: [
    SignUpController
  ],
  providers: [
    /**
     * @keys
     */
    { provide: 'JWT_SECRET_KEY', useValue: 'ulnQmIUlWWAPg9t0gUSeOsUoucT3wk4x8XAhgVvpYEXn0xqrKgx8yRWp' },
    /**
     * @provides `Infra classes`
     */
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IEncryptedContract', useClass: JwtToken },
    /**
     * @useCases `UseCases classes`
     */
    { provide: 'SignUpUseCase', useClass: SignUpUseCase }
  ]
})
export class UserModule { }
