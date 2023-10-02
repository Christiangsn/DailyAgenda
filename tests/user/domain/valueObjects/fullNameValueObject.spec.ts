import { FullNameValueObject } from '@user/domain/valuesObjects/fullNameValueObject'

describe('FullNameValueObject', () => {
  it('Should normaliza name', () => {
    const name = FullNameValueObject.normalize('cHristIan')

    expect(name.isFailure).toBe(false)
    expect(name.getResult().value).toBe('Christian')
  })

  it('Should normaliza name and last name', () => {
    const name = FullNameValueObject.normalize('cHristIan GuimAraes')

    expect(name.isFailure).toBe(false)
    expect(name.getResult().value).toBe('Christian Guimaraes')
  })
})
