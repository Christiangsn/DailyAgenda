import { Result } from '@shared/domain'
import { type UseCaseError } from '@shared/domain/core/useCaseError'

export namespace AuthUseCaseError {
  export class NotProvidedToken extends Result<UseCaseError> {
    public constructor () {
      super(false, {
        message: 'Anauthorization'
      })
    }
  }

  export class InvalidToken extends Result<UseCaseError> {
    public constructor () {
      super(false, {
        message: 'Invalid Token'
      })
    }
  }
}
