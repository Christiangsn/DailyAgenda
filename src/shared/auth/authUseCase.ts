import { Result, type Either, left, right } from '@shared/domain'
import { type IEncryptedContract } from '@user/domain/contracts/cripto/encrypted.contract'
import { type IUserRepository } from '@user/domain/contracts/repo/userRepository.contract'
import { AuthUseCaseError } from './authUseCase.error'
import { Inject } from '@nestjs/common'

export type Input = {
  accessToken: string | null
}

export type Output = Either<
AuthUseCaseError.NotProvidedToken |
AuthUseCaseError.InvalidToken,
Result<{
  userID: string
}>
>

export class AuthUseCase {
  public constructor (
    @Inject('IEncryptedContract')
    private readonly crypto: IEncryptedContract
  ) { }

  public async run ({ accessToken }: Input): Promise<Output> {
    try {
      if (!accessToken) return left(new AuthUseCaseError.NotProvidedToken(), 402)

      const parts = accessToken.split(' ')

      if (parts.length !== 2) {
        return left(new AuthUseCaseError.NotProvidedToken(), 402)
      }

      const [scheme, token] = parts
      if (!/^Bearer$/i.test(scheme)) {
        return left(new AuthUseCaseError.InvalidToken(), 402)
      }

      const validOrExpiredToken = await this.crypto.validate(token)
      if (!validOrExpiredToken) {
        return left(new AuthUseCaseError.InvalidToken(), 402)
      }

      return right(Result.ok({
        userID: validOrExpiredToken
      }))
    } catch (err) {
      return left(new AuthUseCaseError.InvalidToken(), 402)
    }
  }
}
