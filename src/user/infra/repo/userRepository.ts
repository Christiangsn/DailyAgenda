import { type UserDocument, User } from './../entities/userSchema'
import { InjectModel } from '@nestjs/mongoose'
import { type UserAggregate } from '@user/domain/aggregates/userAggregate'
import { type IUserRepository } from '@user/domain/contracts/repo/userRepository.contract'
import { Model } from 'mongoose'
import { UserMapper } from './userMapper'

export class UserRepository implements IUserRepository {
  public constructor (
    @InjectModel(User.name)
    private readonly conn: Model<UserDocument>
  ) {}

  public async save (entity: UserAggregate): Promise<void> {
    const schema = UserMapper.toPersistence(entity)
    const user = new this.conn(schema)
    void await user.save()
  }

  public async findOne (filter: Record<string, string | number>): Promise<UserAggregate | null> {
    const getUser = await this.conn.findOne(filter)
    if (!getUser) return null

    const schema = UserMapper.toDomain(getUser)

    return schema
  }
}
