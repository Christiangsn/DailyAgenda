export interface IEncryptedContract {
  generation: (userID: string) => Promise<string>
  validate: (token: string) => Promise<string | null>
}
