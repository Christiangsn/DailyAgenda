import { Body, Controller, HttpCode, Inject, Logger, Post, Res } from '@nestjs/common'
import { SignInUseCase } from '@user/useCases/signIn/signInUseCase'
import { SignUpUseCase } from '@user/useCases/signUp/signUpUseCase'
import { Response } from 'express'

type SingINDTO = {
  email: string
  password: string
}

@Controller('/signIn')
export class SignInController {
  public constructor (
    @Inject('SignInUseCase')
    public readonly signInUseCase: SignInUseCase
  ) {}

  @Post()
  @HttpCode(200)
  public async execute (@Body() dto: SingINDTO, @Res() res: Response) {
    try {
      const request = await this.signInUseCase.run({
        email: dto?.email,
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
