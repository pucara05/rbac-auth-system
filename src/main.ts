import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
