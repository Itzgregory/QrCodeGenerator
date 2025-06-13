"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieTable = void 0;
function movieTable(movies) {
    return `
    <div class="table-container">
      <table class="dashboard-table movie-table">
        <thead>
          <tr>
            <th class="sn-column">S/N</th>
            <th class="poster-column">Poster</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          ${movies.map((movie, index) => `
            <tr>
              <td class="sn-column">${index + 1}</td>
              <td class="poster-column">
                <img 
                  src="${movie.poster || 'https://via.placeholder.com/50x75/e2e8f0/64748b?text=No+Image'}" 
                  class="movie-poster" 
                  loading="lazy"
                  alt="${movie.title}"
                  onerror="this.onerror=null; this.src='https://via.placeholder.com/50x75/fee2e2/991b1b?text=Error'; this.classList.add('error');"
                />
              </td>
              <td class="movie-title">${movie.title}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="table-stats">
      Showing ${movies.length} movies
    </div>
  `;
}
exports.movieTable = movieTable;
//# sourceMappingURL=movie-table.js.map