import { Module } from '@nestjs/common';
import { QRCodeModule } from './modules/qr-code/qr-code.module';
import { MoviesModule } from './modules/movies/movies.module';
import { PrismaService } from './shared/config/prisma.service';

@Module({
  imports: [
    QRCodeModule,
    MoviesModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}