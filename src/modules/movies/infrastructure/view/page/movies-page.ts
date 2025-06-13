import { layout } from '../../../../qr-code/infrastructure/view/components/layout';
import { lazyLoader } from '../components/lazy--loader';
import { movieTable } from '../components/movie-table';



export function moviesPage(movies: any[], currentPage: number = 1) {
  return layout(`
    <h1>Movie Collection</h1>
    ${movieTable(movies)}
    ${lazyLoader(currentPage)}
  `);
}