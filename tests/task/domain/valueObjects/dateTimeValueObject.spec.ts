import { Logger } from '@nestjs/common'
import { DateTimeValueObject } from '@task/domain/valuesObjects/dateTimeValueObject'

describe('DateTimeValueObject', () => {
  it('should create a valid DateTimeValueObject', () => {
    const validDate = new Date('2023-03-12T16:12:21.136Z')
    const result = DateTimeValueObject.create(validDate)

    expect(result.isSuccess).toBe(true)
    expect(result.getResult().value).toEqual(validDate)
  })

  it('should fail to create DateTimeValueObject with invalid input', () => {
    const invalidDate = '15454789' // Invalid input (string)
    const result = DateTimeValueObject.create(invalidDate as any)

    expect(result.isFailure).toBe(true)
    expect(result.error).toBe('Invalid Date')
  })
})
