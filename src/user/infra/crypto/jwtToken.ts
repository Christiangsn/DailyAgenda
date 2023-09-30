import { type JwtPayload, sign, verify } from 'jsonwebtoken'

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

  public async validate (token: string): Promise<string | null> {
    try {
      const existsToken = verify(token, this.secret) as JwtPayload
      if (!existsToken?.sub) return null

      return existsToken.sub
    } catch {
      return null
    }
  }
}
