import express from 'express';
import { getProducts } from './service.routes';

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await getProducts();
  res.render('welcome', { products });
});

export const publicRoutes = router;
