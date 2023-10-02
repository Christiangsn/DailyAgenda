import { Body, Controller, Delete, HttpCode, Inject, Logger, Post, Put, Query, Res, UseGuards } from '@nestjs/common'
import { CurrentUser, TAuthUser } from '@shared/auth/currentUser.decorator'
import { CreateTaskUseCase, type ICreateTaskOutput } from '@task/useCases/createTask/createTaskUseCase'
import { type IRemoveTaskOutput, RemoveTaskUseCase } from '@task/useCases/removeTask/removeTaskUseCase'
import { type IUpdateTaskOutput, UpdateTaskUseCase } from '@task/useCases/updateTask/updateTaskUseCase'
import { AuthorizationGuard } from '@user/infra/decorators/auth.guard'
import { Response } from 'express'

type UpdateTaskDTO = {
  taskID: string
}

@Controller('/removeTask')
export class RemoveTaskController {
  public constructor (
    @Inject('RemoveTaskUseCase')
    public readonly removeTaskUseCase: RemoveTaskUseCase
  ) {}

  @Delete()
  @UseGuards(AuthorizationGuard)
  @HttpCode(200)
  public async execute (@CurrentUser() currentUser: TAuthUser, @Query() dto: UpdateTaskDTO, @Res() res: Response) {
    try {
      const request = await this.removeTaskUseCase.run({
        ownerID: currentUser.userID,
        taskID: dto.taskID
      })

      if (request.isLeft()) {
        return res.status(request.status).json(request.value.error)
      }

      return res.send((request as IRemoveTaskOutput).value.getResult())
    } catch (error) {
      Logger.log(error)
      return res.status(500).json({
        message: 'Internal Server Error',
        statusCode: 500
      })
    }
  }
}
