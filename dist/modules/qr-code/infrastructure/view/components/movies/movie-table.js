"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieTable = void 0;
function movieTable(movies) {
    return `
    <div class="table-container">
      <table class="movie-table">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          ${movies.map(movie => `
            <tr>
              <td><img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy"/></td>
              <td>${movie.title}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
exports.movieTable = movieTable;
//# sourceMappingURL=movie-table.js.map