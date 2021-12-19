import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import express, { Response, NextFunction, Request } from 'express';
import { NotFoundError } from '../../common/errors/not-found-error';
import { logger } from '../../common/utils/logger';
import { IAppError } from '../../types/errors';
import { customersRoutes } from './routes/customers.routes';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('combined')); // place below static files to avoid static file request logging

app.use('/customers', customersRoutes);

app.get('/healthcheck', (_req: Request, res: Response) => {
  res.sendStatus(200);
});

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
