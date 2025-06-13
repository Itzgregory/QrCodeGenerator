import { NestFactory } from '@nestjs/core';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  await app.listen(APP_CONFIG.port);
  console.log(`Server running on port ${APP_CONFIG.port}`);
}
bootstrap();