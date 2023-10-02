import { type TaskAggregate } from '@task/domain/aggregates/taskAggregate'
import { type ITaskRepository } from '@task/domain/contracts/repo/taskRepository.contract'
import { TaskMapper } from './repoMapper'
import { InjectModel } from '@nestjs/mongoose'
import { Task, type TaskDocument } from '../entities/taskSchema'
import { Model } from 'mongoose'

export class TaskRepository implements ITaskRepository {
  public constructor (
    @InjectModel(Task.name)
    private readonly conn: Model<TaskDocument>
  ) {}

  public async save (task: TaskAggregate): Promise<void> {
    const schema = TaskMapper.toPersistence(task)
    const newtask = new this.conn(schema)
    void await newtask.save()
  }
}
