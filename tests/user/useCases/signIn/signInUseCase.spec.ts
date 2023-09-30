import { ENVIROMENT } from '@config/enviroment'
import { PasswordValueObject } from './../../../../src/user/domain/valuesObjects/passwordValueObject'
import { UserAggregate } from '@user/domain/aggregates/userAggregate'
import { type IEncryptedContract } from '@user/domain/contracts/cripto/encrypted.contract'
import { type IUserRepository } from '@user/domain/contracts/repo/userRepository.contract'
import { EmailValueObject } from '@user/domain/valuesObjects/emailValueObject'
import { FullNameValueObject } from '@user/domain/valuesObjects/fullNameValueObject'
import { SignInUseCase } from '@user/useCases/signIn/signInUseCase'
import { mock, type MockProxy } from 'jest-mock-extended'
import { sign } from 'jsonwebtoken'

describe('Sign In useCase', () => {
  let fakeUserRepo: MockProxy<IUserRepository>
  let fakeCrypto: MockProxy<IEncryptedContract>
  let fakeExistsUser: UserAggregate
  let sut: SignInUseCase

  beforeEach(() => {
    jest.clearAllMocks()

    const password = PasswordValueObject.create('123456').getResult()
    void password.encryptPassword()

    fakeExistsUser = UserAggregate.create({
      email: EmailValueObject.create('johnjoe@example.com').getResult(),
      name: FullNameValueObject.normalize('John Joe').getResult(),
      password
    }).getResult()

    fakeUserRepo = mock()
    fakeCrypto = mock()

    jest.spyOn(fakeUserRepo, 'findOne').mockResolvedValue(fakeExistsUser)

    sut = new SignInUseCase(fakeUserRepo, fakeCrypto)
  })

  it('Should call repo/crypto and save user with success', async () => {
    void await sut.run({
      email: 'johnjoe@example.com',
      password: '123456'
    })
    expect(fakeUserRepo.findOne).toHaveBeenCalled()
    expect(fakeUserRepo.findOne).toHaveBeenCalledTimes(1)
    expect(fakeCrypto.generation).toHaveBeenCalled()
    expect(fakeCrypto.generation).toHaveBeenCalledTimes(1)
  })

  it('Should return fails if user not exists', async () => {
    jest.spyOn(fakeUserRepo, 'findOne').mockResolvedValueOnce(null)

    const signIn = await sut.run({
      email: 'teste@teste.com',
      password: '123456'
    })

    expect(signIn.isLeft()).toBe(true)
    expect(signIn.value.errorValue()).toEqual({
      message: 'Email or password is wrong',
      statusCode: 401
    })
  })

  it('Should return fails if password is not match', async () => {
    const signIn = await sut.run({
      email: 'johnjoe@example.com',
      password: 'senhaerrada'
    })

    expect(signIn.isLeft()).toBe(true)
    expect(signIn.value.errorValue()).toEqual({
      message: 'Email or password is wrong',
      statusCode: 401
    })
  })

  it('Should autentication with success', async () => {
    const fakeToken = sign({}, 'fake_secret', {
      subject: 'fake_id',
      expiresIn: ENVIROMENT.TOKEN_EXPERIES
    })
    jest.spyOn(fakeCrypto, 'generation').mockResolvedValueOnce(fakeToken)

    const signIn = await sut.run({
      email: 'johnjoe@example.com',
      password: '123456'
    })

    expect(signIn.isRight()).toBe(true)
    expect(signIn.value.getResult()).toEqual({
      token: fakeToken
    })
  })
})
