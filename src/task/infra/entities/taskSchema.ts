import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { type Query, type Document } from 'mongoose'

import { type ITaskModel } from '@shared/domain/models/task.model'

export type TaskDocument = Task & Document

@Schema({
  autoCreate: true,
  timestamps: true,
  autoIndex: true
})
export class Task implements ITaskModel {
  @Prop({ immutable: true, required: true, type: String, index: true })
  public readonly id!: string

  @Prop({ immutable: true, required: true, index: true, type: String })
  public ownerID!: string

  @Prop({ type: String, required: true })
  public duration!: string

  @Prop({ type: String, index: true, required: true })
  public title!: string

  @Prop({ type: String, required: true })
  public description!: string

  @Prop({ type: Date, required: true })
  public dateTime!: Date

  @Prop({ type: Date, default: null, index: true })
  public deletedAt?: Date | null
}

export const TaskSchemaFactory = SchemaFactory.createForClass(Task)

TaskSchemaFactory.pre<Query<TaskDocument, TaskDocument>>('find', function () {
  this.where({ deletedAt: null })
})

TaskSchemaFactory.pre<Query<TaskDocument, TaskDocument>>('findOne', function () {
  this.where({ deletedAt: null })
})
