/* eslint-disable @typescript-eslint/no-extraneous-class */

import { UniqueEntityID } from '@shared/domain'
import { type ITaskModel } from '@shared/domain/models/task.model'
import { TaskAggregate } from '@task/domain/aggregates/taskAggregate'
import { DateTimeValueObject } from '@task/domain/valuesObjects/dateTimeValueObject'
import { OwnerIDValueObject } from '@task/domain/valuesObjects/ownerIDValueObject'

export class TaskMapper {
  public static toPersistence (task: TaskAggregate): ITaskModel {
    return {
      dateTime: task.dateTime.value,
      description: task.description,
      duration: task.duration,
      id: task.id.toString(),
      ownerID: task.ownerID.id.toString(),
      title: task.title
    }
  }

  public static toDomain (task: ITaskModel): TaskAggregate {
    return TaskAggregate.create({
      dateTime: DateTimeValueObject.create(new Date(task.dateTime)).getResult(),
      description: task.description,
      duration: task.duration,
      ownerID: OwnerIDValueObject.create(new UniqueEntityID(task.ownerID)).getResult(),
      title: task.title
    }, new UniqueEntityID(task.id)).getResult()
  }
}
