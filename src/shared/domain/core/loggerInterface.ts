export abstract class LoggerInterface<T> {
  protected _id: string
  protected data: T
  protected _commit: string

  public constructor (data: T, commit: string, id: string) {
    this.data = data
    this._commit = `was commited: ${commit}`
    this._id = id
  }
}
