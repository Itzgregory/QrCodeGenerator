import { Injectable } from '@nestjs/common';
import { IMovieRepository } from 'src/core/interfaces/movie.interface';
import { Movie } from 'src/core/entities/movie.entity';
import { HttpClientService } from '../http/http-client.service';
import { APP_CONFIG } from '../../../../shared/config/app.config';
import { prisma } from '../../../../shared/config/prisma.config';

@Injectable()
export class MovieDAO implements IMovieRepository {
  constructor(private readonly httpClient: HttpClientService) {}

 async getRandomMovies(count: number, page: number = 1): Promise<Movie[]> {
  console.log('getRandomMovies called', { count, page });
  const skip = (page - 1) * count;

  try {
    const cachedMovies = await prisma.movie.findMany({
      skip,
      take: count,
      orderBy: { id: 'desc' },
    });
    console.log('Cached Movies:', cachedMovies);

    if (cachedMovies.length >= count) {
      return cachedMovies.map(this.mapToMovieEntity);
    }

    console.log('Fetching from API:', APP_CONFIG.apiUrl);
    const { data } = await this.httpClient.get(APP_CONFIG.apiUrl);
    console.log('API Response:', data);

    const movies: Movie[] = data
      .sort(() => Math.random() - 0.5)
      .slice(skip, skip + count)
      .map(this.mapApiToMovie);

    await this.cacheMovies(movies);
    return movies;
  } catch (err) {
    console.error('Error in getRandomMovies:', err);
    throw new Error('Failed to fetch movies');
    }
  }
  private async getCachedMovies(skip: number, count: number): Promise<Movie[]> {
    try {
      // importing the prisma dynamically so some kind unknow situations
      const { prisma } = await import('../../../../shared/config/prisma.config');
      
      const cachedMovies = await prisma.movie.findMany({
        skip,
        take: count,
        orderBy: { id: 'desc' },
      });

      return cachedMovies.map(this.mapToMovieEntity);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Database not available:', err.message);
      } else {
        console.error('Database not available:', err);
      }
      return [];
    }
  }

  private async getMoviesFromAPI(skip: number, count: number): Promise<Movie[]> {
    try {
      // importing the config dynamically
      const { APP_CONFIG } = await import('../../../../shared/config/app.config');
      
      if (!APP_CONFIG?.apiUrl) {
        console.warn('API URL not configured, skipping API fetch');
        return [];
      }

      const { data } = await this.httpClient.get(APP_CONFIG.apiUrl);
      
      if (!data || !Array.isArray(data)) {
        console.warn('Invalid API response format');
        return [];
      }

      return data
        .sort(() => Math.random() - 0.5)
        .slice(skip, skip + count)
        .map(this.mapApiToMovie)
        .filter(movie => movie.title && movie.poster);
        
    } catch (err) {
      if (err instanceof Error) {
        console.error('API fetch failed:', err.message);
      } else {
        console.error('API fetch failed:', String(err));
      }
      return [];
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
    title: item.title, 
    poster: item.poster,
  };
}

  private async cacheMovies(movies: Movie[]): Promise<void> {
    try {
      const { prisma } = await import('../../../../shared/config/prisma.config');
      await prisma.movie.createMany({
        data: movies.map(m => ({
          title: m.title,
          poster: m.poster,
        })),
        skipDuplicates: true,
      });
      console.log(`Successfully cached ${movies.length} movies`);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Failed to cache movies:', err.message);
      } else {
        console.error('Failed to cache movies:', String(err));
      }
      // it will not break so no point throwing error
    }
  }
}