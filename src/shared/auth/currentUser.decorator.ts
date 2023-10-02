import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { type Request } from 'express'

export type TAuthUser = {
  userID: string
}

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): TAuthUser => {
  const req: Request = context.switchToHttp().getRequest()
  return {
    userID: req.currentUser.id
  }
})
