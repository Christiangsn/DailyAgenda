import { Identifier } from './identifier'
import { v4 } from 'uuid'

export class UniqueEntityID extends Identifier<string | number> {
  public constructor (id?: string | number) {
    super(id || UniqueEntityID.#createUUID())
  }

  static #createUUID (): string {
    return v4()
  }
}
