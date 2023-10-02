import { type TaskAggregate } from '@task/domain/aggregates/taskAggregate'

export interface ITaskRepository {
  save: (task: TaskAggregate) => Promise<void>
}
