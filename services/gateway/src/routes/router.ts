import path from 'path';
import express from 'express';
import morgan from 'morgan';
import { publicRoutes } from './public.routes';
import { proxyRoutes } from './service.routes';

const router = express.Router();

router.use(express.static(path.join(__dirname, '../static')));
router.use(morgan('combined')); // place below static files to avoid static file request logging
router.use(publicRoutes);
router.use(proxyRoutes);

export const appRoutes = router;
