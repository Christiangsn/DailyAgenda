/* eslint-disable @typescript-eslint/no-extraneous-class */
import { UniqueEntityID } from '@shared/domain'
import { type IUserModel } from '@shared/domain/models/user.model'
import { UserAggregate } from '@user/domain/aggregates/userAggregate'
import { EmailValueObject } from '@user/domain/valuesObjects/emailValueObject'
import { FullNameValueObject } from '@user/domain/valuesObjects/fullNameValueObject'
import { PasswordValueObject } from '@user/domain/valuesObjects/passwordValueObject'

export class UserMapper {
  public static toPersistence (user: UserAggregate): IUserModel {
    return {
      email: user.email.value,
      name: user.name.value,
      password: user.password.value,
      id: user.id.toString()
    }
  }

  public static toDomain (user: IUserModel): UserAggregate {
    return UserAggregate.create({
      email: EmailValueObject.create(user.email).getResult(),
      name: FullNameValueObject.normalize(user.name).getResult(),
      password: PasswordValueObject.create(user.password).getResult()
    }, new UniqueEntityID(user.id)).getResult()
  }
}
