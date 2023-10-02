import { Inject } from '@nestjs/common'
import { Result, type Either, left, right } from '@shared/domain'
import { ITaskRepository } from '@task/domain/contracts/repo/taskRepository.contract'
import { RemoveTaskUseCaseError } from './removeTaskUseCase.error'

type IRemoveTaskInput = {
  ownerID: string
  taskID: string
}

export type IRemoveTaskOutput = Either<
RemoveTaskUseCaseError.WithoutPermission |
RemoveTaskUseCaseError.TaskNotFound,
Result<{
  message: string
}>
>

export class RemoveTaskUseCase {
  public constructor (
    @Inject('ITaskRepository')
    private readonly taskRepo: ITaskRepository
  ) { }

  public async run (props: IRemoveTaskInput): Promise<IRemoveTaskOutput> {
    // procurar se existe a task solicitada para deletar
    const existsTask = await this.taskRepo.findOne({ id: props.taskID.trim() })
    if (!existsTask) {
      return left(new RemoveTaskUseCaseError.TaskNotFound(), 404)
    }

    // verificar se quem está removendo é o dono da task
    if (props.ownerID !== existsTask.ownerID.id.toString()) {
      return left(new RemoveTaskUseCaseError.WithoutPermission(), 401)
    }

    void await this.taskRepo.delete(existsTask.id.toString())

    return right(Result.ok({
      message: 'Task removed with success'
    }))
  }
}
