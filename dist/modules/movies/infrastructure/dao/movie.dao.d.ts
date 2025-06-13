import { IMovieRepository } from 'src/core/interfaces/movie.interface';
import { Movie } from 'src/core/entities/movie.entity';
import { HttpClientService } from '../http/http-client.service';
import { PrismaService } from 'src/shared/config/prisma.service';
export declare class MovieDAO implements IMovieRepository {
    private readonly httpClient;
    private readonly prisma;
    constructor(httpClient: HttpClientService, prisma: PrismaService);
    getRandomMovies(count: number, page?: number): Promise<Movie[]>;
    private mapToMovieEntity;
    private mapApiToMovie;
    private cacheMovies;
}
