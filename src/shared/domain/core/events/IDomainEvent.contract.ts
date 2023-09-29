import { type UniqueEntityID } from '../UniqueEntityID.1'

export interface IDomainEvent {
  dateTimeOccurred: Date
  getAggregateId: () => UniqueEntityID
}
