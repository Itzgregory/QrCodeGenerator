import { Injectable } from '@nestjs/common';
import { prisma } from '../../../../shared/config/prisma.config';
import { APP_CONFIG } from '../../../../shared/config/app.config';
import { IMovieRepository } from 'src/core/interfaces/movie.interface';
import { Movie } from 'src/core/entities/movie.entity';
import { HttpClientService } from '../http/http-client.service';

@Injectable()
export class MovieDAO implements IMovieRepository {
  constructor(private readonly httpClient: HttpClientService) {}

  async getRandomMovies(count: number, page: number = 1): Promise<Movie[]> {
    const skip = (page - 1) * count;
    
    const cachedMovies = await prisma.movie.findMany({
      skip,
      take: count,
      orderBy: { id: 'desc' },
    });

    if (cachedMovies.length >= count) {
      return cachedMovies.map(this.mapToMovieEntity);
    }

    try {
      const { data } = await this.httpClient.get(APP_CONFIG.apiUrl);
      const movies: Movie[] = data
        .sort(() => Math.random() - 0.5)
        .slice(skip, skip + count)
        .map(this.mapApiToMovie);

      await this.cacheMovies(movies);
      return movies;
    } catch (err) {
      throw new Error('Failed to fetch movies');
    }
  }

  private mapToMovieEntity(m: { id: number; title: string; poster: string; createdAt: Date }): Movie {
    return {
      title: m.title,
      poster: m.poster,
    };
  }

  private mapApiToMovie(item: any): Movie {
    return {
      title: item.Title,
      poster: item.Poster,
    };
  }

  private async cacheMovies(movies: Movie[]): Promise<void> {
    await prisma.movie.createMany({
      data: movies.map(m => ({
        title: m.title,
        poster: m.poster,
      })),
      skipDuplicates: true,
    });
  }
}