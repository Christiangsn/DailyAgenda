import { Prop, Schema } from '@nestjs/mongoose'
import { type Document } from 'mongoose'

import { type IUserModel } from '@shared/domain/models/user.model'

export type UserDocument = UserSchema & Document

@Schema({
  autoCreate: true,
  timestamps: true,
  autoIndex: true
})
export class UserSchema implements IUserModel {
  @Prop({ immutable: true, required: true, type: String, index: true })
  public readonly id!: string

  @Prop({ required: true, index: true, type: String })
  public email!: string

  @Prop({ type: String, select: false })
  public password!: string

  @Prop({ type: String, index: true })
  public name!: string

  @Prop({ type: Date, required: true })
  public createdAt!: Date

  @Prop({ type: Date, required: true })
  public updatedAt!: Date
}
