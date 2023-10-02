import { AggregateRoot, type UniqueEntityID, Result } from '@shared/domain'
import { type OwnerIDValueObject } from '../valuesObjects/ownerIDValueObject'
import { type DateTimeValueObject } from '../valuesObjects/dateTimeValueObject'

type TTaskAggregateValueObject = {
  ownerID: OwnerIDValueObject
  title: string
  description: string
  duration: string
  dateTime: DateTimeValueObject
}

/**
 * @var ownerID 'OwnerIDValueObject'
 * @var title 'string'
 * @var description 'string'
 * @var duration 'string'
 * @var dateTime 'Date'
 */
export class TaskAggregate extends AggregateRoot<TTaskAggregateValueObject> {
  private constructor (props: TTaskAggregateValueObject, id?: UniqueEntityID) {
    super(props, id)
  }

  public get ownerID () { return this.props.ownerID }
  public get title () { return this.props.title.trim() }
  public get description () { return this.props.description.trim() }
  public get duration () { return this.props.duration.trim() }
  public get dateTime () { return this.props.dateTime }

  public static create (props: TTaskAggregateValueObject, id?: UniqueEntityID): Result<TaskAggregate> {
    return Result.ok<TaskAggregate>(new TaskAggregate(props, id))
  }
}
