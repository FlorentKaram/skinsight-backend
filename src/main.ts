import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = process.env.NODE_ENV || 'dev';
  console.log('env value:', process.env.NODE_ENV);
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
  app.use(cookieParser());
  if (env === 'dev') {
    app.setGlobalPrefix('dev/backskinsight/');
  } else {
    app.setGlobalPrefix('backskinsight/');
  }
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://sample-restaurant.com/',
      'https://www.sample-restaurant.com/',
    ],
    credentials: true,
  });
  // TODO : DTO check
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipUndefinedProperties: true,
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  if (env === 'dev') {
    SwaggerModule.setup('dev/backskinsight/' + 'api', app, document);
  } else {
    SwaggerModule.setup('backskinsight/' + 'api', app, document);
  }
  await app.listen(3000);
  console.log(
    'Swagger is running on http://localhost:3000/dev/backskinsight/api',
  );
}
bootstrap();
