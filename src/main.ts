import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    // swagger title
    .setTitle('Skinsight API')
    // swagger description
    .setDescription('Skinsight API description')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'acces-token',
    )
    //your api version
    .setVersion('1.0.0')
    .build();
  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();
  app.setGlobalPrefix('backskinsight/');
  app.enableCors({
    origin: [
      'https://sample-restaurant.com/',
      'https://www.sample-restaurant.com/',
    ],
  });
  // TODO : DTO check
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipUndefinedProperties: true,
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('backskinsight/' + 'api', app, document);

  await app.listen(3000);
}
bootstrap();


