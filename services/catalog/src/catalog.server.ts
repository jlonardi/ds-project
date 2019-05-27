import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../common/errors/not-found-error';
import { logger } from '../../common/utils/logger';
import { IAppError } from '../../types/errors';
import { catalogRoutes } from './routes/catalog.routes';
import morgan from 'morgan';
import { morganLogFormatter } from '../../common/utils/formatter';

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan(morganLogFormatter as morgan.FormatFn<Request, Response>)); // place below static files to avoid static file request logging

app.use('/catalog', catalogRoutes);

app.listen(port, () => logger.info(`App listening on port ${port}!`));

// Catch 404 and forward to error handler
app.use((req, _res, next) => {
  const err = new NotFoundError(`Not Found: ${req.url}`);
  next(err);
});

// Error handlers
app.use((err: IAppError, _req: any, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  logger.error(err.message);

  if (err.status === 404) {
    res.sendStatus(404);
    return;
  }

  res.status(err.status || 500);
});
