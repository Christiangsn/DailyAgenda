/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { Logger } from '@nestjs/common'

import { Result } from '@shared/domain'
import { left } from '@shared/domain/core/either'
import { type UseCaseError } from './useCaseError'

export interface IUseCases<DTO, Response> {
  execute: (props: DTO) => Promise<Response>
}

export class InternalServerError extends Result<UseCaseError> {
  public constructor () {
    super(false, {
      message: 'Internal Server Error',
      statusCode: 500
    })
  }
}

/**
 * @event
 *  All services implementes in the module this abstract class and interface
 */
export abstract class useCases<DTO> implements IUseCases<DTO, any> {
  public abstract run (httpRequest: DTO): Promise<any>
  protected logger: Logger
  readonly #handlerName: string

  /**
   *
   * @param handlerName
   * @example
   *  SignUp || SignIn || Logout || CreateUser
   */
  public constructor (
    handlerName: string
  ) {
    this.#handlerName = handlerName
    this.logger = new Logger(this.#handlerName)
    // eslint-disable-next-line new-parens
  }

  /**
   *
   * @param httpRequest DTO - Send Params
   * @returns result - Promise<Result<Response>>
   */
  public async execute (httpRequest: DTO) {
    try {
      this.logger.log('Initiating')
      const request = await this.run(httpRequest)
      this.logger.log('finished')
      return request
    } catch (error) {
      const debugMessage = this.debugErrorMessage(error)
      this.logger.error(`error in ${this.#handlerName}`, debugMessage.trim(), error)
      return left(new InternalServerError())
    }
  }

  protected debugErrorMessage (error: any): string {
    const err = JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)))
    const lineError: string = err.stack?.split('at ')[1] ?? 'Unexpected error, no debug information'
    return lineError
  }
}
