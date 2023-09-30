import { type UserAggregate } from '@user/domain/aggregates/userAggregate'

export interface IUserRepository {
  save: (user: UserAggregate) => Promise<void>
}
