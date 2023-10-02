import { Result } from './result'

export interface WithChanges <T> {
  changes: Changes<T>
}

export class Changes <T> {
  private changes: Array<Result<T>>

  constructor () {
    this.changes = []
  }

  public addChange (result: Result<any>): void {
    this.changes.push(result)
  }

  public getChangeResult (): Result<any> {
    return Result.combine(this.changes)
  }
}
