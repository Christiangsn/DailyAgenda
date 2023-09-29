import { type UniqueEntityID } from '../uniqueEntityID'

export interface IDomainEvent {
  dateTimeOccurred: Date
  getAggregateId: () => UniqueEntityID
}
