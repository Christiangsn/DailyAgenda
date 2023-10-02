import { Logger } from '@nestjs/common'
import { Result, ValueObject } from '@shared/domain'

type TDateTimeValueObject = {
  value: Date
}

export class DateTimeValueObject extends ValueObject<TDateTimeValueObject> {
  private constructor (props: TDateTimeValueObject) {
    super(props)
  }

  public get value (): Date { return this.props.value }

  public static create (dateTime: Date): Result<DateTimeValueObject> {
    if (!(dateTime instanceof Date)) {
      return Result.fail('Invalid Date')
    }

    return Result.ok<DateTimeValueObject>(new DateTimeValueObject({ value: dateTime }))
  }
}
