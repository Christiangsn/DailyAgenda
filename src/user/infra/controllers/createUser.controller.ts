import { Controller, Post } from '@nestjs/common'

@Controller('/createUser')
export class CreateUserController {
  @Post()
  public async execute () {

  }
}
