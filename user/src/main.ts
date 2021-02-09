import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4010
    }
  });

  app.startAllMicroservicesAsync();
  await app.listen(3010);
  
  Logger.log('User microservice started');
}

bootstrap();
