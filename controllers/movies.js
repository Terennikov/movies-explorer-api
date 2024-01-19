import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Movie from '../models/Movie.js';
import BadRequestError from '../utils/errors/BadRequestError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';
import NoAccessRightsError from '../utils/errors/NoAccessRightsError.js';
import { errorstxt, responses } from '../utils/errorsAndResponses.js';

export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.status(StatusCodes.OK).send(movies); // массив фильмов
  } catch (error) {
    return next(error);
  }
};

export const createMovie = async (req, res, next) => {
  try {
    const movie = await new Movie({
      nameEN: req.body.nameEN,
      nameRU: req.body.nameRU,
      movieId: req.body.movieId,
      owner: req.user._id,
      thumbnail: req.body.thumbnail,
      trailerLink: req.body.trailer,
      image: req.body.image,
      description: req.body.description,
      year: req.body.year,
      duration: req.body.duration,
      director: req.body.director,
      country: req.body.country,

    });
    return res.status(StatusCodes.OK).send(await movie.save({
      runValidators: true,
    }));
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(error));
    }
    return next(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({ _id: id, owner: req.user._id });
    if (!movie) {
      throw new NotFoundError(errorstxt.filmNotFounded);
    }
    const movieOwner = movie.owner.toString().replace('new ObjectId', '');
    if (movieOwner === req.user._id) {
      await Movie.deleteOne(movie);
      return res.status(StatusCodes.OK).send({ message: responses.movieDelete });
    } throw new NoAccessRightsError(errorstxt.deleteNotAllowed);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(errorstxt.notValidId));
    }
    return next(error);
  }
};
