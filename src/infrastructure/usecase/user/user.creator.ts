import { Injectable, Logger } from '@nestjs/common';
import {
  CreateUserUsecase,
  CreateUserUsecaseArgs,
} from 'src/core/usecase/user';
import { Profile, User } from 'src/core/entity/user';
import { PrismaService } from 'prisma/prisma.service';
import { TransactionManager } from 'prisma/prisma.type';
import { BaseTransactionalUsecaseWrapper } from '../../common/transactional';

@Injectable()
export class UserCreator
  extends BaseTransactionalUsecaseWrapper<CreateUserUsecaseArgs, User>
  implements CreateUserUsecase
{
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly logger: Logger,
  ) {
    super(prisma, logger);
  }

  protected async execute(
    args: CreateUserUsecaseArgs,
    tx: TransactionManager,
  ): Promise<User> {
    const user = await tx.user
      .create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
        },
      })
      .then(User.from);

    await tx.profile
      .create({
        data: {
          userId: user.id,
          image: args.image,
          bio: args.bio,
        },
      })
      .then(Profile.from);

    return user;
  }
}
