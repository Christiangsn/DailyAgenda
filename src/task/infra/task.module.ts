import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { SignUpUseCase } from '@user/useCases/signUp/signUpUseCase'
import { Task, TaskSchemaFactory } from './entities/taskSchema'
import { TaskRepository } from './repo/taskRepository'
import { CreateTaskUseCase } from '@task/useCases/createTask/createTaskUseCase'
import { CreateTaskController } from './controllers/createTask.controller'
import { AuthUseCase } from '@shared/auth/authUseCase'
import { JwtToken } from '@user/infra/crypto/jwtToken'
import { UpdateTaskController } from './controllers/updateTask.controller'
import { UpdateTaskUseCase } from '@task/useCases/updateTask/updateTaskUseCase'
import { MyTasksController } from './controllers/myTasks.controller'
import { MyTasksUseCase } from '@task/useCases/myTasks/myTasksUseCase'
import { RemoveTaskController } from './controllers/removeTask.controller'
import { RemoveTaskUseCase } from '@task/useCases/removeTask/removeTaskUseCase'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchemaFactory }
    ])
  ],
  controllers: [
    CreateTaskController,
    UpdateTaskController,
    MyTasksController,
    RemoveTaskController
  ],
  providers: [
    /**
     * @keys
     */
    { provide: 'JWT_SECRET_KEY', useValue: 'ulnQmIUlWWAPg9t0gUSeOsUoucT3wk4x8XAhgVvpYEXn0xqrKgx8yRWp' },
    /**
     * @provides `Infra classes`
     */
    { provide: 'ITaskRepository', useClass: TaskRepository },
    { provide: 'IEncryptedContract', useClass: JwtToken },
    /**
     * @useCases `UseCases classes`
     */
    { provide: 'AuthUseCase', useClass: AuthUseCase },
    { provide: 'CreateTaskUseCase', useClass: CreateTaskUseCase },
    { provide: 'UpdateTaskUseCase', useClass: UpdateTaskUseCase },
    { provide: 'MyTasksUseCase', useClass: MyTasksUseCase },
    { provide: 'RemoveTaskUseCase', useClass: RemoveTaskUseCase }

  ]
})
export class TaskModule { }
