import { Body, Controller, HttpCode, Inject, Logger, Post, Put, Res, UseGuards } from '@nestjs/common'
import { CurrentUser, TAuthUser } from '@shared/auth/currentUser.decorator'
import { CreateTaskUseCase, type ICreateTaskOutput } from '@task/useCases/createTask/createTaskUseCase'
import { type IUpdateTaskOutput, UpdateTaskUseCase } from '@task/useCases/updateTask/updateTaskUseCase'
import { AuthorizationGuard } from '@user/infra/decorators/auth.guard'
import { Response } from 'express'

type UpdateTaskDTO = {
  title?: string
  duration?: string
  description?: string
  dateTime?: Date
  taskID: string
}

@Controller('/updateTask')
export class UpdateTaskController {
  public constructor (
    @Inject('UpdateTaskUseCase')
    public readonly updateTaskUseCase: UpdateTaskUseCase
  ) {}

  @Put()
  @UseGuards(AuthorizationGuard)
  @HttpCode(200)
  public async execute (@CurrentUser() currentUser: TAuthUser, @Body() dto: UpdateTaskDTO, @Res() res: Response) {
    try {
      const request = await this.updateTaskUseCase.run({
        title: dto?.title ?? null,
        duration: dto?.duration ?? null,
        description: dto?.description ?? null,
        dateTime: dto?.dateTime ?? null,
        ownerID: currentUser.userID,
        taskID: dto.taskID
      })

      if (request.isLeft()) {
        return res.status(request.status).json(request.value.error)
      }

      return res.send((request as IUpdateTaskOutput).value.getResult())
    } catch (error) {
      Logger.log(error)
      return res.status(500).json({
        message: 'Internal Server Error',
        statusCode: 500
      })
    }
  }
}
