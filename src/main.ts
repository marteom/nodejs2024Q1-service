import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home library API description')
    .setVersion('1.0')
    .build();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(port);
}
bootstrap();
