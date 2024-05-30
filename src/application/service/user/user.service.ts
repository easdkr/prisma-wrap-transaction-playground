import { Inject, Injectable, Logger } from '@nestjs/common';
import { User } from 'src/core/entity/user';
import {
  CREATE_USER_USECASE,
  CreateUserUsecase,
  CreateUserUsecaseArgs,
} from 'src/core/usecase/user';

@Injectable()
export class UserService {
  public constructor(
    @Inject(CREATE_USER_USECASE)
    private readonly creator: CreateUserUsecase,
    private readonly logger: Logger,
  ) {}

  public async create(args: CreateUserUsecaseArgs): Promise<User> {
    const user = await this.creator.run(args);

    this.logger.verbose(`User created: ${user.id}`);

    return user;
  }
}
