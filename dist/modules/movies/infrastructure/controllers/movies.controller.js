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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const movies_page_1 = require("../view/page/movies-page");
const movie_dao_1 = require("../dao/movie.dao");
let MoviesController = class MoviesController {
    constructor(movieDAO) {
        this.movieDAO = movieDAO;
    }
    async getMovies(page = '1', res) {
        try {
            const currentPage = Math.max(1, parseInt(page) || 1);
            console.log('Fetching movies for page:', currentPage);
            const movies = await this.movieDAO.getRandomMovies(10, currentPage);
            console.log('Movies fetched:', movies.length);
            res.send((0, movies_page_1.moviesPage)(movies, currentPage));
        }
        catch (err) {
            if (err instanceof Error) {
                console.error('MoviesController Error:', err.message);
            }
            else {
                console.error('MoviesController Error:', err);
            }
            res.status(500).send('Error fetching movies');
        }
    }
};
__decorate([
    (0, common_1.Get)('movies'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovies", null);
MoviesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [movie_dao_1.MovieDAO])
], MoviesController);
exports.MoviesController = MoviesController;
//# sourceMappingURL=movies.controller.js.map