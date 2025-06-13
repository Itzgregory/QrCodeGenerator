import { Response } from 'express';
import { MovieDAO } from '../dao/movie.dao';
export declare class MoviesController {
    private readonly movieDAO;
    constructor(movieDAO: MovieDAO);
    getMovies(page: string | undefined, res: Response): Promise<void>;
}
