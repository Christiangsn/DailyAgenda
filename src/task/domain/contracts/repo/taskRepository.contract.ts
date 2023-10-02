import { type TaskAggregate } from '@task/domain/aggregates/taskAggregate'

export interface ITaskRepository {
  save: (task: TaskAggregate) => Promise<void>
  findOne: (filter: Record<string, string | number>) => Promise<TaskAggregate | null>
  update: (task: TaskAggregate) => Promise<void>
  find: (ownerID: string, titleSearch: string | null, skip: number, limit: number) => Promise<{
    totalTasks: number
    tasks: TaskAggregate[] | []
  }>
  delete: (idTask: string) => Promise<void>
}
