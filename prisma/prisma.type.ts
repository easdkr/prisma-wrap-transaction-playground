import { PrismaClient } from '@prisma/client';

export type TransactionManager = Parameters<
  Parameters<PrismaClient['$transaction']>[0]
>[0];
