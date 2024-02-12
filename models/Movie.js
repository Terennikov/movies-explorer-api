import mongoose from 'mongoose';
import URLREGEXP from '../utils/constans.js';
import { errorstxt } from '../utils/errorsAndResponses.js';

const movieSheme = new mongoose.Schema(
  {
    nameEN: {
      type: String,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => URLREGEXP.test(v),
        message: (props) => `${props.value} ${errorstxt.notValidUrl}`,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => URLREGEXP.test(v),
        message: (props) => `${props.value} ${errorstxt.notValidUrl}`,
      },
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => URLREGEXP.test(v),
        message: (props) => `${props.value} ${errorstxt.notValidUrl}`,
      },
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  // Options
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model('movie', movieSheme);
