import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import { errorstxt } from '../utils/errorsAndResponses.js';

const userSheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, `${errorstxt.minLenght}`],
      maxlenght: [30, `${errorstxt.maxLenght}`],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: (props) => `${props.value} ${errorstxt.notValidEmail}`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model('user', userSheme);
