import { Logger } from '@nestjs/common'
import { type ITaskRepository } from '@task/domain/contracts/repo/taskRepository.contract'
import { CreateTaskUseCase } from '@task/useCases/createTask/createTaskUseCase'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('CreateTask useCase', () => {
  let fakeTaskRepo: MockProxy<ITaskRepository>
  let sut: CreateTaskUseCase

  beforeEach(() => {
    fakeTaskRepo = mock()
    sut = new CreateTaskUseCase(fakeTaskRepo)
  })

  it('Should return erro if invalid DateTime', async () => {
    const exec = await sut.run({
      dateTime: 'error-date' as any,
      description: 'teste description',
      duration: 'teste duration',
      ownerID: 'fake-owner',
      title: 'fake-title'
    })

    expect(exec.isLeft()).toBe(true)
    expect(exec.status).toBe(402)
    expect(exec.value.errorValue()).toEqual({
      message: 'Invalid Date'
    })
  })

  it('Should create task with success', async () => {
    const exec = await sut.run({
      dateTime: new Date('2023-12-12T16:12:21.136Z'),
      description: 'teste description',
      duration: 'teste duration',
      ownerID: 'fake-owner',
      title: 'fake-title'
    })

    expect(exec.isRight()).toBe(true)
    expect(exec.value.getResult().message).toBe('Task created successfully')
  })
})
