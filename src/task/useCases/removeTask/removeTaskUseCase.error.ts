import { Result } from '@shared/domain'
import { type UseCaseError } from '@shared/domain/core/useCaseError'

export namespace RemoveTaskUseCaseError {
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
