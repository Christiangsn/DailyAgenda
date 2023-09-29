import { Logger } from '@nestjs/common'

import { type BaseDomainEntity } from './baseDomainEntity'
import { Entity } from './domainEntity'
import { DomainEvents } from './events/domainEvents'
import { type IDomainEvent } from './events/IDomainEvent.contract'
import { type UniqueEntityID } from './uniqueEntityID'

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/prefer-readonly */

type DomainExtends<T> = T & BaseDomainEntity
export abstract class AggregateRoot<T> extends Entity<DomainExtends<T>> {
  private _domainEvents: IDomainEvent[] = []

  public get id (): UniqueEntityID {
    return this._id
  }

  public get domainEvents (): IDomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent (domainEvent: IDomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent)
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    DomainEvents.markAggregateForDispatch(this)
    // Log the domain event
    this.logDomainEventAdded(domainEvent)
  }

  public clearEvents (): void {
    this._domainEvents.splice(0, this._domainEvents.length)
  }

  private logDomainEventAdded (domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this)
    const domainEventClass = Reflect.getPrototypeOf(domainEvent)
    if (!process.env.NO_CONSOLE_LOG) {
      Logger.log(`[Domain Event Created]: ${thisClass?.constructor.name} ==> ${domainEventClass?.constructor.name}`)
    }
  }
}
