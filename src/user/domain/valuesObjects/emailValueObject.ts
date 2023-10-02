import { Result, ValueObject } from '@shared/domain'

type TEmailValueObject = {
  value: string
}

export class EmailValueObject extends ValueObject<TEmailValueObject> {
  private constructor (props: TEmailValueObject) {
    super(props)
  }

  public get value (): string { return this.props.value }

  public static create (email: string): Result<EmailValueObject> {
    const isValidEmail = EmailValueObject.isValidEmail(email)
    if (!isValidEmail) return Result.fail<EmailValueObject>('Invalid E-mail')
    return Result.ok<EmailValueObject>(new EmailValueObject({ value: email.toLowerCase() }))
  }

  private static isValidEmail (value: string): boolean {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true
    return false
  }
}
