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
const prisma_config_1 = require("../../../../shared/config/prisma.config");
const app_config_1 = require("../../../../shared/config/app.config");
const http_client_service_1 = require("../http/http-client.service");
let MovieDAO = class MovieDAO {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getRandomMovies(count, page = 1) {
        const skip = (page - 1) * count;
        const cachedMovies = await prisma_config_1.prisma.movie.findMany({
            skip,
            take: count,
            orderBy: { id: 'desc' },
        });
        if (cachedMovies.length >= count) {
            return cachedMovies.map(this.mapToMovieEntity);
        }
        try {
            const { data } = await this.httpClient.get(app_config_1.APP_CONFIG.apiUrl);
            const movies = data
                .sort(() => Math.random() - 0.5)
                .slice(skip, skip + count)
                .map(this.mapApiToMovie);
            await this.cacheMovies(movies);
            return movies;
        }
        catch (err) {
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
            title: item.Title,
            poster: item.Poster,
        };
    }
    async cacheMovies(movies) {
        await prisma_config_1.prisma.movie.createMany({
            data: movies.map(m => ({
                title: m.title,
                poster: m.poster,
            })),
            skipDuplicates: true,
        });
    }
};
MovieDAO = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_client_service_1.HttpClientService])
], MovieDAO);
exports.MovieDAO = MovieDAO;
//# sourceMappingURL=movie.dao.js.map