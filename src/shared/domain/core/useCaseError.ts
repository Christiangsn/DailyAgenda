interface IUseCaseError {
  message: string
  statusCode: number
}

export abstract class UseCaseError implements IUseCaseError {
  public message: string
  public statusCode: number

  constructor (
    message: string,
    statusCode: number
  ) {
    this.message = message
    this.statusCode = statusCode || 500
  }
}
