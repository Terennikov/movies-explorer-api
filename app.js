import express, { json } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { config } from 'dotenv';
import { errors } from 'celebrate';
import router from './routes/index.js';
import NotFoundError from './utils/errors/NotFoundError.js'
import limiter from './utils/rateLimetid.js';
import errorHandler from './utils/errors/errorHandler.js';
import cors from 'cors';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const { PORT = 3000 } = process.env;
const { DB_CONN = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(limiter);
 
mongoose.connect(DB_CONN);
app.use(json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use((req, res) => {
  throw new NotFoundError('Страница не найдена');
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
