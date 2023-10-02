import { Body, Controller, Get, HttpCode, Inject, Logger, Res, UseGuards } from '@nestjs/common'
import { CurrentUser, TAuthUser } from '@shared/auth/currentUser.decorator'
import { MyTasksUseCase } from '@task/useCases/myTasks/myTasksUseCase'
import { AuthorizationGuard } from '@user/infra/decorators/auth.guard'
import { Response } from 'express'

type IMyTasksDTO = {
  titleSearch: string | null
  page: number | null
  limit: number | null
}

@Controller('/mytasks')
export class MyTasksController {
  public constructor (
    @Inject('MyTasksUseCase')
    public readonly myTasksUseCase: MyTasksUseCase
  ) {}

  @Get()
  @UseGuards(AuthorizationGuard)
  @HttpCode(200)
  public async execute (@CurrentUser() currentUser: TAuthUser, @Body() dto: IMyTasksDTO, @Res() res: Response) {
    try {
      const request = await this.myTasksUseCase.run({
        ownerID: currentUser.userID,
        titleSearch: dto.titleSearch,
        currentPage: dto?.page,
        limit: dto?.limit
      })
      return res.send(request)
    } catch (error) {
      Logger.log(error)
      return res.status(500).json({
        message: 'Internal Server Error',
        statusCode: 500
      })
    }
  }
}
