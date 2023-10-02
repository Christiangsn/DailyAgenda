import { Result, ValueObject } from '@shared/domain'

type TDateTimeValueObject = {
  value: Date
}

export class DateTimeValueObject extends ValueObject<TDateTimeValueObject> {
  private constructor (props: TDateTimeValueObject) {
    super(props)
  }

  public get value (): Date { return this.props.value }

  public static create (dateTime: Date): Result<TDateTimeValueObject> {
    if (!(dateTime instanceof Date)) {
      return Result.fail('Invalid Date')
    }

    return Result.ok<TDateTimeValueObject>({ value: dateTime })
  }
}
