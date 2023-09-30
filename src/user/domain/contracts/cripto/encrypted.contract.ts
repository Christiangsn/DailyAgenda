export interface IEncryptedContract {
  generation: (userID: string) => Promise<string>
}
