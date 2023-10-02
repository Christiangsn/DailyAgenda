import { Result } from '@shared/domain'
import { type UseCaseError } from '@shared/domain/core/useCaseError'

export namespace CreateTaskUseCaseError {
  export class InvalidParamError extends Result<UseCaseError> {
    public constructor (paramError: string) {
      super(false, {
        message: paramError
      })
    }
  }

}
