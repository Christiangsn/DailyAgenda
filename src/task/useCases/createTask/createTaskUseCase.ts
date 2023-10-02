import { OwnerIDValueObject } from './../../domain/valuesObjects/ownerIDValueObject'
import { UniqueEntityID, Result } from '@shared/domain'
import { type Either, left, right } from '@shared/domain/core/either'
import { DateTimeValueObject } from './../../domain/valuesObjects/dateTimeValueObject'
import { CreateTaskUseCaseError } from './createTaskUseCase.errors'
import { TaskAggregate } from '@task/domain/aggregates/taskAggregate'
import { Inject } from '@nestjs/common'
import { ITaskRepository } from '@task/domain/contracts/repo/taskRepository.contract'

type ICreateTaskInput = {
  ownerID: string
  title: string
  duration: string
  description: string
  dateTime: Date
}

type ICreateUserOutput = Either<
CreateTaskUseCaseError.InvalidParamError,
Result<{
  message: string
}>
>

export class CreateTaskUseCase {
  public constructor (
    @Inject('ITaskRepository')
    private readonly taskRepo: ITaskRepository
  ) {}

  public async run (props: ICreateTaskInput): Promise<ICreateUserOutput> {
    // Validar se o datetime é valido
    const dateTimeTaskOrError = DateTimeValueObject.create(props.dateTime)
    if (dateTimeTaskOrError.isFailure) {
      return left(new CreateTaskUseCaseError.InvalidParamError(dateTimeTaskOrError.error.toString()), 402)
    }

    // criar a task de dominio
    const newTask = TaskAggregate.create({
      dateTime: dateTimeTaskOrError.getResult(),
      description: props.description.trim(),
      duration: props.duration.trim(),
      ownerID: OwnerIDValueObject.create(new UniqueEntityID(props.ownerID)).getResult(),
      title: props.title
    }).getResult()

    void await this.taskRepo.save(newTask)

    return right(Result.ok({
      message: 'Task created successfully'
    }))
  }
}
