import { Movie } from '../entities/movie.entity';

export interface IMovieRepository {
  getRandomMovies(count: number, page?: number): Promise<Movie[]>;
}