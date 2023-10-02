import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchemaFactory } from './entities/userSchema'
import { UserRepository } from './repo/userRepository'
import { JwtToken } from './crypto/jwtToken'
import { SignUpController } from './controllers/signUp.controller'
import { SignUpUseCase } from '@user/useCases/signUp/signUpUseCase'
import { SignInController } from './controllers/signIn.controller'
import { SignInUseCase } from '@user/useCases/signIn/signInUseCase'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchemaFactory }
    ])
  ],
  controllers: [
    SignUpController,
    SignInController
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
    { provide: 'SignUpUseCase', useClass: SignUpUseCase },
    { provide: 'SignInUseCase', useClass: SignInUseCase }
  ]
})
export class UserModule { }
