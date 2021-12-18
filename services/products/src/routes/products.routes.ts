import express from 'express';
import { getProducts } from '../operations/products.operations';

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await getProducts();
  res.json(products);
});

export const productsRoutes = router;
