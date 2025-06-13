import { Module } from '@nestjs/common';
import { QRCodeModule } from './modules/qr-code/qr-code.module';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [
    QRCodeModule,
    MoviesModule,
  ],
})
export class AppModule {}