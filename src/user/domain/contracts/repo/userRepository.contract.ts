import { type UserAggregate } from '@user/domain/aggregates/userAggregate'

export interface IUserRepository {
  save: (user: UserAggregate) => Promise<void>
  /**
   *
   * @param filter
   * @exemple { email: 'johnjoe@exemple.com' }
   * @returns `UserAggregate`
   */
  findOne: (filter: Record<string, string | number>) => Promise<UserAggregate | null>
}
