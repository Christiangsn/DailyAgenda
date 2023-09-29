import { type BaseDomainEntity } from './baseDomainEntity'
import { UniqueEntityID } from './uniqueEntityID'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

export abstract class Entity<T extends BaseDomainEntity> {
  protected readonly _id: UniqueEntityID
  protected readonly props: T
  protected _isNew: boolean
  readonly #date_asia_jerusalem: Date

  public constructor (props: T, id?: UniqueEntityID, isNew?: boolean) {
    this._id = id || new UniqueEntityID()
    this.props = props
    this._isNew = isNew ?? false
    this.#date_asia_jerusalem = new Date()
  }

  public get createdAt (): Date {
    return this.props?.createdAt ?? this.#date_asia_jerusalem
  }

  public get updatedAt (): Date {
    return this?.props?.updatedAt ?? this.#date_asia_jerusalem
  }

  public get deletedAt (): Date {
    return this?.props?.deletedAt ?? this.#date_asia_jerusalem
  }

  public get isNew (): boolean {
    return this._isNew
  }

  public get isDeleted (): boolean {
    return this?.props?.isDeleted ?? false
  }

  public equals (object?: Entity<T>): boolean {
    if (object === null || object === undefined) return false
    if (this === object) return true
    if (!isEntity(object)) return false
    else return this._id.equals(object._id)
  }
}
