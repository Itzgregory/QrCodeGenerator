import { Controller, Get, Query, Res, Headers } from '@nestjs/common';
import { Response } from 'express';
import { moviesPage } from '../view/page/movies-page';
import { MovieDAO } from '../dao/movie.dao';

@Controller()
export class MoviesController {
  constructor(private readonly movieDAO: MovieDAO) {}

  @Get('movies')
async getMovies(@Query('page') page: string = '1', @Res() res: Response) {
  try {
    const currentPage = Math.max(1, parseInt(page) || 1);
    console.log('Fetching movies for page:', currentPage);
    const movies = await this.movieDAO.getRandomMovies(10, currentPage);
    console.log('Movies fetched:', movies.length);
    res.send(moviesPage(movies, currentPage));
  } catch (err) {
    if (err instanceof Error) {
      console.error('MoviesController Error:', err.message);
    } else {
      console.error('MoviesController Error:', err);
    }
    res.status(500).send('Error fetching movies');
  }
}
}

