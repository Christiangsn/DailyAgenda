import { Inject } from '@nestjs/common'
import { ITaskRepository } from '@task/domain/contracts/repo/taskRepository.contract'

type TMyTasksInput = {
  ownerID: string
  titleSearch?: string | null
  currentPage?: number | null
  limit?: number | null
}

type TMyTasksOutput = {
  tasks: Array<{
    id: string
    title: string
    duration: string
    description: string
    dateTime: Date
  }> | []
  totalTasks: number
  totalPages: number
  currentPage: number
}

export class MyTasksUseCase {
  public constructor (
    @Inject('ITaskRepository')
    private readonly taskRepo: ITaskRepository
  ) { }

  public async run ({ ownerID, currentPage, limit, titleSearch = null }: TMyTasksInput): Promise<TMyTasksOutput> {
    const perPage = Number(currentPage) || 1
    const limitPerPage = Number(limit) || 10
    const skip = (perPage - 1) * limitPerPage

    const getTasks = await this.taskRepo.find(ownerID, titleSearch, skip, limitPerPage)

    return {
      tasks: getTasks.tasks.map(task => ({
        id: task.id.toString(),
        title: task.title,
        duration: task.duration,
        description: task.description,
        dateTime: task.dateTime.value
      })),
      totalTasks: getTasks.totalTasks,
      totalPages: Math.ceil(getTasks.totalTasks / limitPerPage),
      currentPage: perPage
    }
  }
}
