import { right } from '../../../shared/domain/core/either'
import { PasswordValueObject } from '../../domain/valuesObjects/passwordValueObject'
import { FullNameValueObject } from '../../domain/valuesObjects/fullNameValueObject'
import { EmailValueObject } from '@user/domain/valuesObjects/emailValueObject'
import { Result, type Either, left } from '@shared/domain'
import { useCases } from '@shared/domain/core/useCase'
import { SignUpUseCaseError } from './signUpUseCases.errors'
import { UserAggregate } from '@user/domain/aggregates/userAggregate'
import { type IUserRepository } from '@user/domain/contracts/repo/userRepository.contract'
import { type IEncryptedContract } from '@user/domain/contracts/cripto/encrypted.contract'
import { Inject, Logger } from '@nestjs/common'

type ICreateUserInput = {
  fullName: string
  email: string
  password: string
}

type ICreateUserOutput = Either<
SignUpUseCaseError.EmailAlreadyExists |
SignUpUseCaseError.InvalidParamError,
Result<{
  token: string
}>
>

export class SignUpUseCase {
  public constructor (
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    @Inject('IEncryptedContract')
    private readonly crypto: IEncryptedContract
  ) { }

  public async run ({ email, fullName, password }: ICreateUserInput): Promise<ICreateUserOutput> {
    const emailIsExists = await this.userRepo.findOne({ email: email.trim() })
    if (emailIsExists) {
      return left(new SignUpUseCaseError.EmailAlreadyExists(), 401)
    }

    Logger.log(password)
    // Criando os objetos de valores
    const emailOrError = EmailValueObject.create(email.trim())
    const fullNameNormalized = FullNameValueObject.normalize(fullName.trim())
    const pass = PasswordValueObject.create(password)

    // Validar se algum campo está invalido
    const validFields = Result.combine([emailOrError, fullNameNormalized, pass])
    if (validFields.isFailure) {
      return left(new SignUpUseCaseError.InvalidParamError(validFields.errorValue()), 401)
    }

    // Criptografar a senha
    const encryptPassword = pass.getResult()
    void encryptPassword.encryptPassword()

    // Criar os dados de usuário de dominio
    const newUser = UserAggregate.create({
      email: emailOrError.getResult(),
      name: fullNameNormalized.getResult(),
      password: encryptPassword
    }).getResult()

    // registrar o usuário na aplicação
    void await this.userRepo.save(newUser)

    // Gerar o token de autenticação
    const token = await this.crypto.generation(newUser.id.toString())

    // retornar como resposta o token após registrar o usuário
    return right(Result.ok({
      token
    }))
  }
}
