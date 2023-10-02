import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { SignUpUseCase } from '@user/useCases/signUp/signUpUseCase'
import { Task, TaskSchemaFactory } from './entities/taskSchema'
import { TaskRepository } from './repo/taskRepository'
import { CreateTaskUseCase } from '@task/useCases/createTask/createTaskUseCase'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchemaFactory }
    ])
  ],
  controllers: [

  ],
  providers: [
    /**
     * @provides `Infra classes`
     */
    { provide: 'ITaskRepository', useClass: TaskRepository },
    /**
     * @useCases `UseCases classes`
     */
    { provide: 'CreateTaskUseCase', useClass: CreateTaskUseCase }
  ]
})
export class TaskModule { }
