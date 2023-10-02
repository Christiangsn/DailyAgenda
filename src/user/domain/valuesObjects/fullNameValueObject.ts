import { Result, ValueObject } from '@shared/domain'

type TNameValueObject = {
  value: string
}

export class FullNameValueObject extends ValueObject<TNameValueObject> {
  private constructor (props: TNameValueObject) {
    super(props)
  }

  public get value (): string { return this.props.value }

  public static normalize (fullName: string): Result<FullNameValueObject> {
    // Divida o nome em palavras separadas por espaço
    const words = fullName.toLowerCase().split(' ')

    // Capitalize a primeira letra de cada palavra
    const normalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })

    const normalizedName = normalizedWords.join(' ')

    return Result.ok<FullNameValueObject>(new FullNameValueObject({ value: normalizedName }))
  }
}
