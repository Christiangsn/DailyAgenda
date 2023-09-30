import { Result } from '@shared/domain'
import { type UseCaseError } from '@shared/domain/core/useCaseError'

export namespace SignInUseCaseError {
  export class EmailOrPasswordIsWrong extends Result<UseCaseError> {
    public constructor () {
      super(false, {
        message: 'Email or password is wrong',
        statusCode: 401
      })
    }
  }
}
