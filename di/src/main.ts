import { NestFactory } from '@nestjs/core';
import { ComputerModule } from './computer/computer.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ComputerModule,
    new FastifyAdapter()
  );


  await app.listen(3000);
}

bootstrap();
