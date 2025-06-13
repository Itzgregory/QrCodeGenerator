import { NestFactory } from '@nestjs/core';
import { Request, Response, NextFunction } from 'express';
import { AppModule } from './app.module';
import { APP_CONFIG } from './shared/config/app.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Global Error:', err.stack);
    res.status(500).send('Internal Server Error');
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.enableCors();
  await app.listen(APP_CONFIG.port);
  console.log(`Server running on port ${APP_CONFIG.port}`);
}
bootstrap().catch(err => console.error('Bootstrap Error:', err));