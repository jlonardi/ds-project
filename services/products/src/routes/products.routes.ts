import express from 'express';
import { getProducts, getSelectedProducts } from '../operations/products.operations';

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await getProducts();
  res.json(products);
});

router.post('/', async (req, res) => {
  console.log('Requested products', req.body.products);
  const selectedProducts = await getSelectedProducts(req.body.products);
  res.json(selectedProducts);
});

export const productsRoutes = router;
