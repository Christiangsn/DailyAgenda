import request from 'supertest'

import { type INestApplication } from '@nestjs/common'
import { AppModule } from '../../src/app.module'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Test, type TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ENVIROMENT } from '@config/enviroment'
import axios, { type AxiosError } from 'axios'

describe('/signUp', () => {
  const urlTest: string = 'http://localhost:3030'

  let app: INestApplication
  let mongoInMemory: MongoMemoryServer

  beforeAll(async () => {
    mongoInMemory = await MongoMemoryServer.create()
    const uri = mongoInMemory.getUri()

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(uri, {
          dbName: 'testdb'
        }),
        AppModule
      ]
    }).compile()

    app = module.createNestApplication()
    void await app.listen(3030)
  })

  afterAll(async () => {
    void await app.close()
    void await mongoInMemory.stop()
  })

  it('Should return success with request is successful', async () => {
    const response = await axios.post(urlTest + '/signUp', {
      email: 'johnjoe@exemple.com',
      password: '123',
      fullName: 'John joE SmiTh'
    })

    expect(response.status).toBe(200)
    expect(response.data.token).toBeDefined()
  })

  it('Should return an error if any property is invalid', async () => {
    try {
      void await axios.post(urlTest + '/signUp', {
        email: 'johnjoeerror',
        password: '123',
        fullName: 'John joE SmiTh'
      })
    } catch (err) {
      const axiosError = err as unknown as AxiosError
      expect(axiosError.response?.data).toEqual({
        message: 'Invalid E-mail'
      })
      expect(axiosError.response?.status).toBe(401)
    }
  })
})
