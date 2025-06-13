import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MoviesController } from './infrastructure/controllers/movies.controller';
import { MovieDAO } from './infrastructure/dao/movie.dao';
import { HttpClientService } from './infrastructure/http/http-client.service';

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [MovieDAO, HttpClientService],
  exports: [MovieDAO], 
})
export class MoviesModule {}