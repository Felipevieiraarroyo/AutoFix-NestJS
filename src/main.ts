import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter.js'; // <-- Agrega esta línea

process.loadEnvFile();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Registra el filtro de excepciones globalmente
  app.useGlobalFilters(new PrismaExceptionFilter()); // <-- Agrega esta línea

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();