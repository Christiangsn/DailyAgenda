import { sign } from 'jsonwebtoken'

import { type IEncryptedContract } from '@user/domain/contracts/cripto/encrypted.contract'
import { ENVIROMENT } from '@config/enviroment'

export class JwtToken implements IEncryptedContract {
  public constructor (
    private readonly secret: string
  ) { }

  public async generation (userID: string): Promise<string> {
    const generationToken = sign({}, this.secret, {
      subject: userID,
      expiresIn: Number(ENVIROMENT.TOKEN_EXPERIES)
    })

    return generationToken
  }
}
