import { Entity, Result, type UniqueEntityID } from '@shared/domain'

export class OwnerIDValueObject extends Entity<any> {
  private constructor (id?: UniqueEntityID) {
    super(null, id)
  }

  public get id (): UniqueEntityID { return this._id }

  public static create (id?: UniqueEntityID): Result<OwnerIDValueObject> {
    return Result.ok<OwnerIDValueObject>(new OwnerIDValueObject(id))
  }
}
