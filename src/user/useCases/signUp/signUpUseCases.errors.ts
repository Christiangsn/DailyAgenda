import { Result } from '@shared/domain'
import { type UseCaseError } from '@shared/domain/core/useCaseError'

export namespace SignUpUseCaseError {
  export class InvalidParamError extends Result<UseCaseError> {
    public constructor (paramError: string) {
      super(false, {
        message: paramError
      })
    }
  }

  export class EmailAlreadyExists extends Result<UseCaseError> {
    public constructor () {
      super(false, {
        message: 'Email already exists!'
      })
    }
  }
}
