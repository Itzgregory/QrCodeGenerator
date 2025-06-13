"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesPage = void 0;
const layout_1 = require("../components/layout");
const lazy__loader_1 = require("../components/lazy--loader");
const movie_table_1 = require("../components/movie-table");
function moviesPage(movies, currentPage = 1) {
    return (0, layout_1.movieLayout)(`
    <div class="dashboard-header">
      <h1>Movie Collection</h1>
      <p>Complete collection overview and management</p>
    </div>
    ${(0, movie_table_1.movieTable)(movies)}
    ${(0, lazy__loader_1.lazyLoader)(currentPage)}
  `);
}
exports.moviesPage = moviesPage;
//# sourceMappingURL=movies-page.js.map