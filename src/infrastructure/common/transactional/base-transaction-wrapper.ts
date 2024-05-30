import { InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TransactionManager } from 'prisma/prisma.type';
import { TransactionalUsecase } from 'src/core/common/usecase';

export abstract class BaseTransactionalUsecaseWrapper<Args, Result>
  implements TransactionalUsecase<Args, Result>
{
  protected constructor(
    protected readonly prisma: PrismaService,
    protected readonly logger: Logger,
  ) {}

  protected abstract execute(
    args: Args,
    tx: TransactionManager,
  ): Promise<Result>;

  public async run(args: Args): Promise<Result> {
    return this.prisma
      .$transaction((tx) => this.execute(args, tx))
      .catch((error) => {
        this.logger.error(error);
        throw new InternalServerErrorException('Failed to execute transaction');
      });
  }

  public async runInTransaction(
    args: Args,
    tx: TransactionManager,
  ): Promise<Result> {
    return this.execute(args, tx);
  }
}
