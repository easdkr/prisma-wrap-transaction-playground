import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './infrastructure/module';
import { RedisModule } from './infrastructure/common/redis';

@Module({
  imports: [
    PrismaModule,
    RedisModule.register({
      host: 'localhost',
      port: 6379,
    }),
    UserModule,
  ],
})
export class AppModule {}
