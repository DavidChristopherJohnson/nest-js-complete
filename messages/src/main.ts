import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MessagesModule,
    new FastifyAdapter()
  );

  app.useGlobalPipes(
    new ValidationPipe()
  );

  await app.listen(3000);
}

bootstrap();
