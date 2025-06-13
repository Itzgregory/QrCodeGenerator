import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { moviesPage } from '../view/page/movies-page';
import { MovieDAO } from '../dao/movie.dao';

@Controller()
export class MoviesController {
  constructor(private readonly movieDAO: MovieDAO) {}

  @Get('movies')
  async getMovies(@Query('page') page: string = '1', @Res() res: Response) {
    try {
      const currentPage = parseInt(page) || 1;
      const movies = await this.movieDAO.getRandomMovies(10, currentPage);
      res.send(moviesPage(movies, currentPage));
    } catch (err) {
      res.status(500).send('Error fetching movies');
    }
  }
}