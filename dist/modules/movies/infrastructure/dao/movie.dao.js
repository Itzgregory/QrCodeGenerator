"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
            console.log('Cached Movies:', cachedMovies);
            if (cachedMovies.length >= count) {
                return cachedMovies.map(this.mapToMovieEntity);
            }
            console.log('Fetching from API:', app_config_1.APP_CONFIG.apiUrl);
            const { data } = await this.httpClient.get(app_config_1.APP_CONFIG.apiUrl);
            console.log('API Response:', data);
            const movies = data
                .sort(() => Math.random() - 0.5)
                .slice(skip, skip + count)
                .map(this.mapApiToMovie);
            await this.cacheMovies(movies);
            return movies;
        }
        catch (err) {
            console.error('Error in getRandomMovies:', err);
            if (typeof err === 'object' && err !== null && 'code' in err && err.code === 'P2024') {
                console.error('Database connection pool exhausted. Consider increasing connection limits.');
                try {
                    const apiMovies = await this.getMoviesFromAPI(skip, count);
                    if (apiMovies.length > 0) {
                        return apiMovies;
                    }
                }
                catch (apiErr) {
                    console.error('API fallback also failed:', apiErr);
                }
            }
            throw new Error('Failed to fetch movies');
        }
    }
    async getCachedMovies(skip, count) {
        try {
            const { prisma } = await Promise.resolve().then(() => __importStar(require('../../../../shared/config/prisma.config')));
            const cachedMovies = await prisma.movie.findMany({
                skip,
                take: count,
                orderBy: { id: 'desc' },
            });
            return cachedMovies.map(this.mapToMovieEntity);
        }
        catch (err) {
            if (err instanceof Error) {
                console.error('Database not available:', err.message);
            }
            else {
                console.error('Database not available:', err);
            }
            return [];
        }
    }
    async getMoviesFromAPI(skip, count) {
        try {
            const { APP_CONFIG } = await Promise.resolve().then(() => __importStar(require('../../../../shared/config/app.config')));
            if (!(APP_CONFIG === null || APP_CONFIG === void 0 ? void 0 : APP_CONFIG.apiUrl)) {
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
        }
        catch (err) {
            if (err instanceof Error) {
                console.error('API fetch failed:', err.message);
            }
            else {
                console.error('API fetch failed:', String(err));
            }
            return [];
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
        try {
            const validMovies = movies.filter(m => m.title && m.poster);
            if (validMovies.length === 0) {
                console.log('No valid movies to cache');
                return;
            }
            const { prisma } = await Promise.resolve().then(() => __importStar(require('../../../../shared/config/prisma.config')));
            await prisma.movie.createMany({
                data: validMovies.map(m => ({
                    title: m.title,
                    poster: m.poster,
                })),
                skipDuplicates: true,
            });
            console.log(`Successfully cached ${validMovies.length} movies`);
        }
        catch (err) {
            if (err instanceof Error) {
                console.error('Failed to cache movies:', err.message);
            }
            else {
                console.error('Failed to cache movies:', String(err));
            }
        }
    }
};
MovieDAO = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_client_service_1.HttpClientService,
        prisma_service_1.PrismaService])
], MovieDAO);
exports.MovieDAO = MovieDAO;
//# sourceMappingURL=movie.dao.js.map