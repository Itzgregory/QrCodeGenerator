"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieDAO = void 0;
const common_1 = require("@nestjs/common");
const http_client_service_1 = require("../http/http-client.service");
const app_config_1 = require("../../../../shared/config/app.config");
const prisma_service_1 = require("../../../../shared/config/prisma.service");
let MovieDAO = class MovieDAO {
    constructor(httpClient, prisma) {
        this.httpClient = httpClient;
        this.prisma = prisma;
    }
    async getRandomMovies(count, page = 1) {
        console.log('getRandomMovies called', { count, page });
        const skip = (page - 1) * count;
        try {
            const cachedMovies = await this.prisma.movie.findMany({
                skip,
                take: count,
                orderBy: { id: 'desc' },
            });
            if (cachedMovies.length >= count) {
                return cachedMovies.map(this.mapToMovieEntity);
            }
            console.log('Fetching from API:', app_config_1.APP_CONFIG.apiUrl);
            const response = await this.httpClient.get(app_config_1.APP_CONFIG.apiUrl);
            if (!response || !Array.isArray(response)) {
                console.error('Invalid API response format');
                throw new Error('Invalid API response format');
            }
            const movies = response
                .sort(() => Math.random() - 0.5)
                .slice(skip, skip + count)
                .map(this.mapApiToMovie)
                .filter(movie => movie.title && movie.poster);
            if (movies.length > 0) {
                await this.cacheMovies(movies).catch(err => console.error('Failed to cache movies:', err));
            }
            return movies;
        }
        catch (err) {
            console.error('Error in getRandomMovies:', err);
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
    mapToMovieEntity(m) {
        return {
            title: m.title,
            poster: m.poster,
        };
    }
    mapApiToMovie(item) {
        return {
            title: item.Title || item.title,
            poster: item.Poster || item.poster,
        };
    }
    async cacheMovies(movies) {
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
};
MovieDAO = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_client_service_1.HttpClientService,
        prisma_service_1.PrismaService])
], MovieDAO);
exports.MovieDAO = MovieDAO;
//# sourceMappingURL=movie.dao.js.map