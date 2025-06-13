import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieDAO } from './infrastructure/dao/movie.dao';
import { MoviesController } from './infrastructure/controllers/movies.controller';
import { HttpClientService } from './infrastructure/http/http-client.service';
import { PrismaService } from 'src/shared/config/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [
    PrismaService,
    MovieDAO,
    HttpClientService,
  ],
  exports: [MovieDAO], 
})
export class MoviesModule {}