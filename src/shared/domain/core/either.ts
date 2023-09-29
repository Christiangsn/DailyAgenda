export type Either<L, A> = Left<L, A> | Right<L, A>

export class Left<L, A> {
  readonly value: L
  readonly status: number

  constructor (value: L, status?: number) {
    this.value = value
    this.status = status ?? 500
  }

  isLeft (): this is Left<L, A> {
    return true
  }

  isRight (): this is Right<L, A> {
    return false
  }
}

export class Right<L, A> {
  readonly value: A
  readonly status: number

  constructor (value: A, status?: number) {
    this.value = value
    this.status = status ?? 200
  }

  isLeft (): this is Left<L, A> {
    return false
  }

  isRight (): this is Right<L, A> {
    return true
  }
}

export const left = <L, A>(l: L, status?: number): Either<L, A> => {
  return new Left(l, status)
}

export const right = <L, A>(a: A, status?: number): Either<L, A> => {
  return new Right<L, A>(a, status)
}
