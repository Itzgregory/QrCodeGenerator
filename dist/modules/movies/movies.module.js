"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesModule = void 0;
const common_1 = require("@nestjs/common");
const movie_dao_1 = require("./infrastructure/dao/movie.dao");
const movies_controller_1 = require("./infrastructure/controllers/movies.controller");
const http_client_service_1 = require("./infrastructure/http/http-client.service");
const prisma_service_1 = require("../../shared/config/prisma.service");
let MoviesModule = class MoviesModule {
};
MoviesModule = __decorate([
    (0, common_1.Module)({
        controllers: [movies_controller_1.MoviesController],
        providers: [
            prisma_service_1.PrismaService,
            movie_dao_1.MovieDAO,
            http_client_service_1.HttpClientService,
        ],
        exports: [movie_dao_1.MovieDAO],
    })
], MoviesModule);
exports.MoviesModule = MoviesModule;
//# sourceMappingURL=movies.module.js.map