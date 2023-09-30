import { right } from '../../../shared/domain/core/either'
import { PasswordValueObject } from '../../domain/valuesObjects/passwordValueObject'
import { FullNameValueObject } from '../../domain/valuesObjects/fullNameValueObject'
import { EmailValueObject } from '@user/domain/valuesObjects/emailValueObject'
import { Result, type Either, left } from '@shared/domain'
import { useCases } from '@shared/domain/core/useCase'
import { SignInUseCaseError } from './signInUseCases.errors'
import { UserAggregate } from '@user/domain/aggregates/userAggregate'
import { type IUserRepository } from '@user/domain/contracts/repo/userRepository.contract'
import { type IEncryptedContract } from '@user/domain/contracts/cripto/encrypted.contract'

type ICreateUserInput = {
  fullName: string
  email: string
  password: string
}

type ICreateUserOutput = Either<
SignInUseCaseError.InvalidParamError,
Result<{
  token: string
}>
>

export class SignInUseCase extends useCases<ICreateUserInput> {
  public constructor (
    private readonly userRepo: IUserRepository,
    private readonly crypto: IEncryptedContract
  ) {
    super('CreateUserUseCase')
  }

  public async run ({ email, fullName, password }: ICreateUserInput): Promise<ICreateUserOutput> {
    // Criando os objetos de valores
    const emailOrError = EmailValueObject.create(email)
    const fullNameNormalized = FullNameValueObject.normalize(fullName)
    const pass = PasswordValueObject.create(password)

    // Validar se algum campo está invalido
    const validFields = Result.combine([emailOrError, fullNameNormalized, pass])
    if (validFields.isFailure) {
      return left(new SignInUseCaseError.InvalidParamError(validFields.errorValue()))
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
