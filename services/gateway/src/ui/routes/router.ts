import path from 'path';
import express, { Request, RequestHandler, Response } from 'express';
import morgan from 'morgan';
import { morganLogFormatter } from '../../../../common/utils/formatter';
import { authRoutes } from '../../routes/auth.routes';
import { publicRoutes } from './public.routes';
import { privateRoutes } from './private.routes';

const router = express.Router();

const userInViews: RequestHandler = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

router.use(express.static(path.join(__dirname, '../static')));
router.use(morgan(morganLogFormatter as morgan.FormatFn<Request, Response>)); // place below static files to avoid static file request logging
router.use(userInViews);
router.use(authRoutes);
router.use(publicRoutes);
router.use(privateRoutes);

export const appRoutes = router;
