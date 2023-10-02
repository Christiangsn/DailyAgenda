import { Result } from '@shared/domain'
import { type UseCaseError } from '@shared/domain/core/useCaseError'

export namespace UpdateTaskUseCaseError {
  export class InvalidParamError extends Result<UseCaseError> {
    public constructor (paramError: string) {
      super(false, {
        message: paramError
      })
    }
  }

  export class TaskNotFound extends Result<UseCaseError> {
    public constructor () {
      super(false, {
        message: 'Task not found'
      })
    }
  }

  export class WithoutPermission extends Result<UseCaseError> {
    public constructor () {
      super(false, {
        message: 'You are not allowed to do this'
      })
    }
  }
}
