import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { createMovie, getMovies, deleteMovie } from '../controllers/movies.js';
import URLREGEXP from '../utils/constans.js';

const movieRouter = Router();

movieRouter.get('/', getMovies); //получение фильмов, созданных пользователем
movieRouter.post('/', celebrate({ //создание фильма
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URLREGEXP),
    trailer: Joi.string().required().pattern(URLREGEXP),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(URLREGEXP),
    movieId: Joi.number().required(),
  }),
}), createMovie);
movieRouter.delete('/:id', celebrate({ //удаление фильма
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
}), deleteMovie);

export default movieRouter;
