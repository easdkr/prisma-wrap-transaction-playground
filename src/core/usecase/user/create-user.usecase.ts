import { TransactionalUsecase } from 'src/core/common/usecase';
import { User } from 'src/core/entity/user';

export interface CreateUserUsecaseArgs {
  name: string;
  email: string;
  password: string;
  image: string;
  bio: string;
}

export interface CreateUserUsecase
  extends TransactionalUsecase<CreateUserUsecaseArgs, User> {}

export const CREATE_USER_USECASE = Symbol('__create_user_usecase__');
