import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS si es necesario
  app.enableCors();
  app.use(helmet());
  // Uso global de ValidationPipe para validar DTOs
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('RBAC Auth System')
    .setDescription('The RBAC authentication system API')
    .setVersion('1.0')
    .addBearerAuth() // Para autenticar con JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Aplicación corriendo en http://localhost:${port}`);
  console.log(
    `Documentación Swagger disponible en http://localhost:${port}/api`,
  );
}
bootstrap();
