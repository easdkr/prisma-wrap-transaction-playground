import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApplication } from './app.initializor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeApplication(app);

  await app.listen(3000);
}
bootstrap();
