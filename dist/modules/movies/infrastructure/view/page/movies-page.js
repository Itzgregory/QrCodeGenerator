"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesPage = void 0;
const layout_1 = require("../../../../qr-code/infrastructure/view/components/layout");
const lazy__loader_1 = require("../components/lazy--loader");
const movie_table_1 = require("../components/movie-table");
function moviesPage(movies, currentPage = 1) {
    return (0, layout_1.layout)(`
    <h1>Movie Collection</h1>
    ${(0, movie_table_1.movieTable)(movies)}
    ${(0, lazy__loader_1.lazyLoader)(currentPage)}
  `);
}
exports.moviesPage = moviesPage;
//# sourceMappingURL=movies-page.js.map