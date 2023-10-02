import { type Result } from '@shared/domain'
import { UserAggregate } from '@user/domain/aggregates/userAggregate'
import { EmailValueObject } from '@user/domain/valuesObjects/emailValueObject'
import { FullNameValueObject } from '@user/domain/valuesObjects/fullNameValueObject'
import { PasswordValueObject } from '@user/domain/valuesObjects/passwordValueObject'

describe('UserAggregate', () => {
  let fakeEmailValueObject: EmailValueObject
  let fakePasswordValueObject: PasswordValueObject
  let fakeFullNameValueObject: FullNameValueObject

  let userAggregate: Result<UserAggregate>

  beforeEach(() => {
    fakeEmailValueObject = EmailValueObject.create('john@example.com').getResult()
    fakeFullNameValueObject = FullNameValueObject.normalize('jOhn Joe').getResult()
    fakePasswordValueObject = PasswordValueObject.create('123456').getResult()
  })

  it('Should return profile user with success', () => {
    userAggregate = UserAggregate.create({
      email: fakeEmailValueObject,
      name: fakeFullNameValueObject,
      password: fakePasswordValueObject
    })

    expect(userAggregate.isSuccess).toBe(true)
  })

  it('Should get valid values', () => {
    userAggregate = UserAggregate.create({
      email: fakeEmailValueObject,
      name: fakeFullNameValueObject,
      password: fakePasswordValueObject
    })

    expect(userAggregate.isSuccess).toBe(true)

    const user = userAggregate.getResult()
    expect(user.name.value).toBe('John Joe')
    expect(user.email.value).toBe('john@example.com')
    expect(user.password.value).toBeDefined()
  })
})
