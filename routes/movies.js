import { Router } from 'express';
import { createMovie, getMovies, deleteMovie } from '../controllers/movies.js';
import { checkCreatMovieValidation, checkDeleteMovieValidation } from '../middlewares/validations/joiMovieValidation.js';

const movieRouter = Router();

movieRouter.get('/', getMovies);
movieRouter.post('/', checkCreatMovieValidation, createMovie);
movieRouter.delete('/:id', checkDeleteMovieValidation, deleteMovie);

export default movieRouter;
