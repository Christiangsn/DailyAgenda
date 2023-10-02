import { Body, Controller, HttpCode, Inject, Logger, Post, Res, UseGuards } from '@nestjs/common'
import { CurrentUser, TAuthUser } from '@shared/auth/currentUser.decorator'
import { CreateTaskUseCase, type ICreateTaskOutput } from '@task/useCases/createTask/createTaskUseCase'
import { AuthorizationGuard } from '@user/infra/decorators/auth.guard'
import { Response } from 'express'

type CreateTaskDTO = {
  title: string
  duration: string
  description: string
  dateTime: Date
}

@Controller('/createTask')
export class CreateTaskController {
  public constructor (
    @Inject('CreateTaskUseCase')
    public readonly createTaskUseCase: CreateTaskUseCase
  ) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  @HttpCode(200)
  public async execute (@CurrentUser() currentUser: TAuthUser, @Body() dto: CreateTaskDTO, @Res() res: Response) {
    try {
      const request = await this.createTaskUseCase.run({
        title: dto.title,
        duration: dto.duration,
        description: dto.description,
        dateTime: dto.dateTime,
        ownerID: currentUser.userID
      })

      if (request.isLeft()) {
        return res.status(request.status).json(request.value.error)
      }

      return res.send((request as ICreateTaskOutput).value.getResult())
    } catch (error) {
      Logger.log(error)
      return res.status(500).json({
        message: 'Internal Server Error',
        statusCode: 500
      })
    }
  }
}
