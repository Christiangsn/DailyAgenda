import { compareSync, hashSync } from 'bcrypt'

import { Result, ValueObject } from '@shared/domain'

export type IPasswordValueObjectProps = {
  value: string
}

export interface IDomainPasswordContract {
  encryptPassword: () => Promise<void>
  comparePassword: (plainText: string) => Promise<boolean>
}

export class PasswordValueObject extends ValueObject<IPasswordValueObjectProps> implements IDomainPasswordContract {
  #isEncrypted: boolean
  // static #isEncryptPassword: RegExp = /\$2b\$\d\d\$[\s\S]{53}|{.}\b/gm
  static #isEncryptPassword: RegExp = /^\$2[ayb]\$.{56}$/

  private constructor (props: IPasswordValueObjectProps, isEncrypted: boolean) {
    super(props)
    this.#isEncrypted = isEncrypted
  }

  public get value (): string { return this.props.value }

  public get isAlreadyEncrypt (): boolean {
    return PasswordValueObject.#isEncryptPassword.test(this.props.value)
  }

  public async encryptPassword (): Promise<void> {
    this.props.value = hashSync(this.props.value, 10)
    this.#isEncrypted = true
  }

  public async comparePassword (plainText: string): Promise<boolean> {
    if (this.#isEncrypted) return compareSync(plainText, this.props.value)
    return plainText === this.props.value
  }

  public static randomPassword (): Result<PasswordValueObject> {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let password = ''

    for (let i = 0; i < 5; i++) {
      const indice = Math.floor(Math.random() * caracteres.length)
      password += caracteres.charAt(indice)
    }

    const pass = new PasswordValueObject({ value: password }, false)
    return Result.ok<PasswordValueObject>(pass)
  }

  public static create (password: string): Result<PasswordValueObject> {
    const isEncrypt = this.#isEncryptPassword.test(password.toString())
    if (!isEncrypt) {
      const isValidPasswordLength = password.length >= 3 && password.length <= 20
      if (!isValidPasswordLength) return Result.fail<PasswordValueObject>('Password must have min 3 char and max 20 char')
    }
    const pass = new PasswordValueObject({ value: password }, isEncrypt)
    return Result.ok<PasswordValueObject>(pass)
  }
}
