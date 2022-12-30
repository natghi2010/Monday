import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
   app.enableCors({
        allowedHeaders:"*",
        origin: "*"
    });
    
  await app.listen(configuration().port);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false },
    }),
  );
  console.log(`Application is running on: ${await app.getUrl()}`);
    
}

bootstrap();
