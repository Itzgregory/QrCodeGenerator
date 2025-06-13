import { Controller, Get, Query, Res, Headers } from '@nestjs/common';
import { Response } from 'express';
import { moviesPage } from '../view/page/movies-page';
import { MovieDAO } from '../dao/movie.dao';

@Controller()
export class MoviesController {
  constructor(private readonly movieDAO: MovieDAO) {}

  @Get('movies')
  async getMovies(
    @Query('page') page: string = '1', 
    @Query('t') timestamp: string,
    @Headers('accept') accept: string,
    @Res() res: Response
  ) {
    try {
      const currentPage = parseInt(page) || 1;
      console.log(`Fetching movies for page: ${currentPage}`);
      
      // Try to get movies, with fallback data if it fails
      let movies;
      try {
        movies = await this.movieDAO.getRandomMovies(10, currentPage);
        console.log(`Found ${movies.length} movies from DAO`);
      } catch (daoError) {
        console.error('DAO failed, using fallback data:', daoError);
        // Fallback to dummy data if everything fails
        movies = this.getFallbackMovies(currentPage);
      }
      
      // Check if request wants JSON (for AJAX calls from lazy loader)
      if (accept && accept.includes('application/json')) {
        return res.json({ movies, currentPage });
      }
      
      // Return HTML page
      const htmlResponse = moviesPage(movies, currentPage);
      res.send(htmlResponse);
      
    } catch (err) {
      console.error('Error in MoviesController:', err);
      
      // Send a proper error page
      res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Error - Movies</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                max-width: 600px; 
                margin: 50px auto; 
                padding: 20px;
                background-color: #f8fafc;
              }
              .error-container {
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                text-align: center;
              }
              .error-title { color: #dc2626; margin-bottom: 20px; }
              .error-details { 
                background: #fee2e2; 
                padding: 15px; 
                border-radius: 5px; 
                margin: 20px 0;
                text-align: left;
              }
              .retry-btn {
                background: #3b82f6;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
                margin: 10px 5px;
              }
            </style>
          </head>
          <body>
            <div class="error-container">
              <h1 class="error-title">Error Loading Movies</h1>
              <p>We're having trouble loading the movies right now.</p>
              <div class="error-details">
                <strong>Error Details:</strong><br>
                ${typeof err === 'object' && err !== null && 'message' in err ? (err as any).message : 'Unknown error'}
              </div>
              <a href="/movies" class="retry-btn">Try Again</a>
              <a href="/qr" class="retry-btn">Back to QR</a>
            </div>
          </body>
        </html>
      `);
    }
  }

  private getFallbackMovies(page: number) {
    const dummyMovies = [
      { title: "The Matrix", poster: "https://via.placeholder.com/300x450/000000/ffffff?text=The+Matrix" },
      { title: "Inception", poster: "https://via.placeholder.com/300x450/000000/ffffff?text=Inception" },
      { title: "Interstellar", poster: "https://via.placeholder.com/300x450/000000/ffffff?text=Interstellar" },
      { title: "The Dark Knight", poster: "https://via.placeholder.com/300x450/000000/ffffff?text=Dark+Knight" },
      { title: "Pulp Fiction", poster: "https://via.placeholder.com/300x450/000000/ffffff?text=Pulp+Fiction" },
      { title: "Fight Club", poster: "https://via.placeholder.com/300x450/000000/ffffff?text=Fight+Club" },
      { title: "Forrest Gump", poster: "https://via.placeholder.com/300x450/000000/ffffff?text=Forrest+Gump" },
      { title: "The Godfather", poster: "https://via.placeholder.com/300x450/000000/ffffff?text=The+Godfather" },
      { title: "Goodfellas", poster: "https://via.placeholder.com/300x450/000000/ffffff?text=Goodfellas" },
      { title: "Scarface", poster: "https://via.placeholder.com/300x450/000000/ffffff?text=Scarface" }
    ];
    
    const startIndex = (page - 1) * 10;
    return dummyMovies.slice(startIndex, startIndex + 10);
  }
}

