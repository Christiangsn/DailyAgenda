import { Body, Controller, HttpCode, Inject, Logger, Post, Res } from '@nestjs/common'
import { SignUpUseCase } from '@user/useCases/signUp/signUpUseCase'
import { Response } from 'express'

type SingUPDTO = {
  fullName: string
  email: string
  password: string
}

@Controller('/signUp')
export class SignUpController {
  public constructor (
    @Inject('SignUpUseCase')
    public readonly signUpUseCase: SignUpUseCase
  ) {}

  @Post()
  @HttpCode(200)
  public async execute (@Body() dto: SingUPDTO, @Res() res: Response) {
    try {
      const request = await this.signUpUseCase.run({
        email: dto?.email,
        fullName: dto?.fullName,
        password: dto?.password
      })

      if (request.isLeft()) {
        return res.status(request.status).json(request.value.error)
      }

      return res.send(request.value.getResult())
    } catch (error) {
      Logger.log(error)
      return res.status(500).json({
        message: 'Internal Server Error',
        statusCode: 500
      })
    }
  }
}
