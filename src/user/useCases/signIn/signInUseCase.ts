import { type Either, Result, left, right } from '@shared/domain'
import { type IEncryptedContract } from '@user/domain/contracts/cripto/encrypted.contract'
import { type IUserRepository } from '@user/domain/contracts/repo/userRepository.contract'
import { SignInUseCaseError } from './signInUseCase.error'

type ISignInInput = {
  email: string
  password: string
}

type ICreateUserOutput = Either<
SignInUseCaseError.EmailOrPasswordIsWrong,
Result<{
  token: string
}>
>

export class SignInUseCase {
  public constructor (
    private readonly userRepo: IUserRepository,
    private readonly crypto: IEncryptedContract
  ) { }

  public async run ({ email, password }: ISignInInput): Promise<ICreateUserOutput> {
    // procurar o usuário pelo email atráves do filtro
    const findUser = await this.userRepo.findOne({ email })
    if (!findUser) { // Se não existir retornar o erro de email ou password errado
      return left(new SignInUseCaseError.EmailOrPasswordIsWrong())
    }

    // Validar o password
    const passwordIsMatch = await findUser.password.comparePassword(password)
    if (!passwordIsMatch) {
      return left(new SignInUseCaseError.EmailOrPasswordIsWrong())
    }

    // Gerar o token de autenticação
    const token = await this.crypto.generation(findUser.id.toString())

    // retornar como resposta o token após registrar o usuário
    return right(Result.ok({
      token
    }))
  }
}
