import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const userSheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длинна 2 символа'],
      maxlenght: [30, 'Максимальная длинна 30 символов'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: (props) => `${props.value} не валидный email`,
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
