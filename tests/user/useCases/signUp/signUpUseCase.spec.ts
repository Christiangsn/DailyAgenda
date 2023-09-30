import { ENVIROMENT } from '@config/enviroment'
import { mock, type MockProxy } from 'jest-mock-extended'
import { sign } from 'jsonwebtoken'

import { SignInUseCase } from '@user/useCases/signIn/signInUseCase'
import { type IUserRepository } from '@user/domain/contracts/repo/userRepository.contract'
import { type IEncryptedContract } from '@user/domain/contracts/cripto/encrypted.contract'

describe('Sign In useCase', () => {
  const fakeDTO = {
    email: 'johnjoe@exemple.com',
    fullName: 'John Joe Smith',
    password: '123456'
  }

  let fakeUserRepo: MockProxy<IUserRepository>
  let fakeCrypto: MockProxy<IEncryptedContract>
  let sut: SignInUseCase

  beforeEach(() => {
    jest.clearAllMocks()
    fakeUserRepo = mock()
    fakeCrypto = mock()

    sut = new SignInUseCase(fakeUserRepo, fakeCrypto)
  })

  it('Should call repo/crypto and save user with success', async () => {
    void await sut.run(fakeDTO)

    expect(fakeUserRepo.save).toHaveBeenCalled()
    expect(fakeUserRepo.save).toHaveBeenCalledTimes(1)
    expect(fakeCrypto.generation).toHaveBeenCalled()
    expect(fakeCrypto.generation).toHaveBeenCalledTimes(1)
  })

  it('Should save user with success', async () => {
    const fakeToken = sign({}, 'fake_secret', {
      subject: 'fake_id',
      expiresIn: ENVIROMENT.TOKEN_EXPERIES
    })
    jest.spyOn(fakeCrypto, 'generation').mockResolvedValueOnce(fakeToken)

    const newUser = await sut.run(fakeDTO)

    expect(newUser.isRight()).toBe(true)
    expect(newUser.value.getResult()).toEqual({
      token: fakeToken
    })
  })
})
