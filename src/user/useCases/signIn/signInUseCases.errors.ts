import { Result } from '@shared/domain'
import { type UseCaseError } from '@shared/domain/core/useCaseError'

export namespace SignInUseCaseError {
  export class InvalidParamError extends Result<UseCaseError> {
    public constructor (paramError: string) {
      super(false, {
        message: paramError,
        statusCode: 401
      })
    }
  }
}
