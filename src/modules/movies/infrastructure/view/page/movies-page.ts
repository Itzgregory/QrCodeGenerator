import { movieLayout } from '../components/layout';
import { lazyLoader } from '../components/lazy--loader';
import { movieTable } from '../components/movie-table';

export function moviesPage(movies: any[], currentPage: number = 1) {
  return movieLayout(`
    <div class="dashboard-header">
      <h1>Movie Collection</h1>
      <p>Complete collection overview and management</p>
    </div>
    ${movieTable(movies)}
    ${lazyLoader(currentPage)}
  `);
}