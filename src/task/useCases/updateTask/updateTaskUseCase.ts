import { Inject } from '@nestjs/common'
import { Result, type Either, left, right } from '@shared/domain'
import { ITaskRepository } from '@task/domain/contracts/repo/taskRepository.contract'
import { UpdateTaskUseCaseError } from './updateTaskUseCase.error'
import { DateTimeValueObject } from '@task/domain/valuesObjects/dateTimeValueObject'

type IUpdateTaskInput = {
  ownerID: string
  taskID: string
  title?: string | null
  duration?: string | null
  description?: string | null
  dateTime?: Date | null
}

export type IUpdateTaskOutput = Either<
UpdateTaskUseCaseError.WithoutPermission |
UpdateTaskUseCaseError.TaskNotFound |
UpdateTaskUseCaseError.InvalidParamError,
Result<{
  message: string
}>
>

export class UpdateTaskUseCase {
  public constructor (
    @Inject('ITaskRepository')
    private readonly taskRepo: ITaskRepository
  ) { }

  public async run (props: IUpdateTaskInput): Promise<IUpdateTaskOutput> {
    // procurar se existe a task solicitada para alterar
    const existsTask = await this.taskRepo.findOne({ id: props.taskID.trim() })
    if (!existsTask) {
      return left(new UpdateTaskUseCaseError.TaskNotFound(), 402)
    }

    // verificar se quem está alterando é o dono da task
    if (props.ownerID !== existsTask.ownerID.id.toString()) {
      return left(new UpdateTaskUseCaseError.WithoutPermission(), 401)
    }

    // verificar a data de alteração se é do tipo data
    if (props?.dateTime) {
      const newDateTime = DateTimeValueObject.create(props.dateTime)
      if (newDateTime.isFailure) {
        return left(new UpdateTaskUseCaseError.InvalidParamError(newDateTime.error.toString()), 402)
      }

      existsTask.setDateTime = newDateTime.getResult()
    }

    // demais campos
    if (props?.title) existsTask.setTitle = props.title
    if (props?.description) existsTask.setDescription = props.description
    if (props?.duration) existsTask.setDuration = props.duration

    // update na task
    void await this.taskRepo.update(existsTask)

    return right(Result.ok({
      message: 'Task changed successfully'
    }))
  }
}
