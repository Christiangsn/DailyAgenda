import { type TaskAggregate } from '@task/domain/aggregates/taskAggregate'
import { type ITaskRepository } from '@task/domain/contracts/repo/taskRepository.contract'
import { TaskMapper } from './repoMapper'
import { InjectModel } from '@nestjs/mongoose'
import { Task, type TaskDocument } from '../entities/taskSchema'
import { type FilterQuery, Model, type Query, type QueryOptions } from 'mongoose'

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

  public async update (task: TaskAggregate): Promise<void> {
    const schema = TaskMapper.toPersistence(task)

    void await this.conn.updateOne({ id: schema.id }, {
      $set: schema
    })
  }

  public async findOne (filter: Record<string, string | number>): Promise<TaskAggregate | null> {
    const getTask = await this.conn.findOne(filter)
    if (!getTask) return null

    const schema = TaskMapper.toDomain(getTask)

    return schema
  }

  public async find (ownerID: string, titleSearch: string | null, skip: number, limit: number): Promise<{
    totalTasks: number
    tasks: TaskAggregate[] | []
  }> {
    const query: Query<any[], any> = this.conn.find()
    let filters: FilterQuery<Task[]>

    if (titleSearch) {
      const searchValue = titleSearch.trim()
      filters = [
        { title: { $regex: searchValue, $options: 'i' } }
      ]
      query.or(filters)
    }

    query.where({ ownerID })

    const count = await this.conn.countDocuments(query)

    const tasks = await query
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec()

    return {
      tasks: tasks.map(task => TaskMapper.toDomain(task)),
      totalTasks: count
    }
  }

  public async delete (taskID: string): Promise<void> {
    void await this.conn.updateOne({
      id: taskID
    }, {
      deletedAt: new Date()
    })
  }
}
