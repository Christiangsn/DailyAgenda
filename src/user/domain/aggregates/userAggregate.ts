import { type PasswordValueObject } from './../valuesObjects/passwordValueObject'
import { type EmailValueObject } from '../valuesObjects/emailValueObject'
import { type FullNameValueObject } from './../valuesObjects/fullNameValueObject'
import { AggregateRoot, type UniqueEntityID, Result } from '@shared/domain'

type TUserAggregateProps = {
  name: FullNameValueObject
  email: EmailValueObject
  password: PasswordValueObject
}

/**
 * @var fullName 'FullNameValueObject'
 * @var password 'PasswordValueObject'
 * @var email 'EmailValueObject'
 */
export class UserAggregate extends AggregateRoot<TUserAggregateProps> {
  private constructor (props: TUserAggregateProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public get name () { return this.props.name }
  public get email () { return this.props.email }
  public get password () { return this.props.password }

  public static create (props: TUserAggregateProps, id?: UniqueEntityID): Result<UserAggregate> {
    return Result.ok<UserAggregate>(new UserAggregate(props, id))
  }
}
