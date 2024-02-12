import express, { json } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { config } from 'dotenv';
import { errors } from 'celebrate';
import cors from 'cors';
import router from './routes/index.js';
import NotFoundError from './utils/errors/NotFoundError.js';
import limiter from './utils/rateLimetid.js';
import errorHandler from './utils/errors/errorHandler.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import dburltest from './utils/mongourl.js';
import { errorstxt, responses } from './utils/errorsAndResponses.js';

const { PORT = 3000 } = process.env;
const { DB_CONN = dburltest } = process.env;
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
    throw new Error(errorstxt.serverNowDown);
  }, 0);
});
app.use(router);
app.use((req, res) => {
  throw new NotFoundError(errorstxt.pageNotFound);
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${responses.appListeningPort} ${PORT}`);
});
