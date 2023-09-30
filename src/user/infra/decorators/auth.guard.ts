import { UnauthorizedException, type CanActivate, type ExecutionContext, Inject } from '@nestjs/common'
import { AuthUseCase } from '@shared/auth/authUseCase'
import { type Request } from 'express'

export class AuthorizationGuard implements CanActivate {
  constructor (
    @Inject('AuthUseCase')
    private readonly authUseCase: AuthUseCase
  ) { }

  public async canActivate (context: ExecutionContext): Promise<boolean> {
    // Pegar o contexto da request
    const req: Request = context.switchToHttp().getRequest()

    // enviar o cabeçalho como o token se existir
    const account = await this.authUseCase.run({
      accessToken: req.headers?.authorization ?? null
    })

    // validar se passou no caso se uso de autenticação
    if (account.isLeft()) {
      throw new UnauthorizedException({
        message: account.value.errorValue().message,
        statusCode: '401'
      })
    }

    // coloque o user no contexto da request para orquestrar quem está autenticado
    req.currentUser = {
      id: account.value.getResult().userID
    }

    return true
  }
}
