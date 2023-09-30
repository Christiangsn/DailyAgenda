import { Request } from 'express'

declare module 'express' {
  interface Request {
    currentUser: {
      id: string
    }
  }
}
