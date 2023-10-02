import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { type Document } from 'mongoose'

import { type IUserModel } from '@shared/domain/models/user.model'

export type UserDocument = User & Document

@Schema({
  autoCreate: true,
  timestamps: true,
  autoIndex: true
})
export class User implements IUserModel {
  @Prop({ immutable: true, required: true, type: String, index: true })
  public readonly id!: string

  @Prop({ required: true, index: true, type: String })
  public email!: string

  @Prop({ type: String })
  public password!: string

  @Prop({ type: String, index: true })
  public name!: string

  @Prop({ type: Date, default: new Date() })
  public createdAt!: Date

  @Prop({ type: Date, default: new Date() })
  public updatedAt!: Date
}

export const UserSchemaFactory = SchemaFactory.createForClass(User)
