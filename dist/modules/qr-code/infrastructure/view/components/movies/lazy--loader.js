"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyLoader = void 0;
function lazyLoader(currentPage) {
    return `
    <div id="loading-indicator" style="display: none;">
      Loading more movies...
    </div>
    <script>
      let isLoading = false;
      let currentPage = ${currentPage};
      
      window.addEventListener('scroll', () => {
        if (isLoading) return;
        
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const threshold = 100;
        
        if (scrollTop + clientHeight >= scrollHeight - threshold) {
          loadMoreMovies();
        }
      });
      
      async function loadMoreMovies() {
        isLoading = true;
        document.getElementById('loading-indicator').style.display = 'block';
        
        try {
          currentPage++;
          const response = await fetch('/movies?page=' + currentPage);
          const html = await response.text();
          
          // i will parse d new movies from the response
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;
          const newRows = tempDiv.querySelector('.movie-table tbody').innerHTML;
          
          // here now, i will just append new rows to the table
          document.querySelector('.movie-table tbody').insertAdjacentHTML('beforeend', newRows);
        } catch (error) {
          console.error('Error loading more movies:', error);
        } finally {
          isLoading = false;
          document.getElementById('loading-indicator').style.display = 'none';
        }
      }
    </script>
  `;
}
exports.lazyLoader = lazyLoader;
//# sourceMappingURL=lazy--loader.js.map