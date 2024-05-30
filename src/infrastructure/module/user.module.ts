import { Logger, Module, Provider } from '@nestjs/common';
import { CREATE_USER_USECASE } from 'src/core/usecase/user';
import { UserCreator } from '../usecase/user';
import { Type } from '@nestjs/common/interfaces';
import { UserService } from 'src/application/service/user';
import { UserController } from '../rest/user';

const usecases: Provider[] = [
  {
    provide: CREATE_USER_USECASE,
    useClass: UserCreator,
  },
];

const services: Provider[] = [UserService];

const controller: Type<any>[] = [UserController];

@Module({
  providers: [Logger, ...usecases, ...services],
  controllers: [...controller],
})
export class UserModule {}
