import { Injectable } from '@nestjs/common';
import { IMovieRepository } from 'src/core/interfaces/movie.interface';
import { Movie } from 'src/core/entities/movie.entity';
import { HttpClientService } from '../http/http-client.service';
import { APP_CONFIG } from '../../../../shared/config/app.config';
import { PrismaService } from 'src/shared/config/prisma.service';

@Injectable()
export class MovieDAO implements IMovieRepository {
  constructor(
    private readonly httpClient: HttpClientService,
    private readonly prisma: PrismaService
  ) {}

  async getRandomMovies(count: number, page: number = 1): Promise<Movie[]> {
    console.log('getRandomMovies called', { count, page });
    const skip = (page - 1) * count;

    try {
      // First try to get from cache
      const cachedMovies = await this.prisma.movie.findMany({
        skip,
        take: count,
        orderBy: { id: 'desc' },
      });

      if (cachedMovies.length >= count) {
        return cachedMovies.map(this.mapToMovieEntity);
      }

      // If cache is empty, try API
      console.log('Fetching from API:', APP_CONFIG.apiUrl);
      const response = await this.httpClient.get(APP_CONFIG.apiUrl);
      
      if (!response || !Array.isArray(response)) {
        console.error('Invalid API response format');
        throw new Error('Invalid API response format');
      }

      const movies: Movie[] = response
        .sort(() => Math.random() - 0.5)
        .slice(skip, skip + count)
        .map(this.mapApiToMovie)
        .filter(movie => movie.title && movie.poster);

      // Cache the results for future requests
      if (movies.length > 0) {
        await this.cacheMovies(movies).catch(err => 
          console.error('Failed to cache movies:', err)
        );
      }

      return movies;
    } catch (err) {
      console.error('Error in getRandomMovies:', err);
      
      // If we have any cached movies at all, return them
      const fallbackMovies = await this.prisma.movie.findMany({
        take: count,
        orderBy: { id: 'desc' },
      });

      if (fallbackMovies.length > 0) {
        return fallbackMovies.map(this.mapToMovieEntity);
      }

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
      title: item.Title || item.title, 
      poster: item.Poster || item.poster, 
    };
  }

  private async cacheMovies(movies: Movie[]): Promise<void> {
    const validMovies = movies.filter(m => m.title && m.poster);
    
    if (validMovies.length === 0) {
      console.log('No valid movies to cache');
      return;
    }

    await this.prisma.movie.createMany({
      data: validMovies.map(m => ({
        title: m.title,
        poster: m.poster,
      })),
      skipDuplicates: true,
    });
    console.log(`Successfully cached ${validMovies.length} movies`);
  }
}