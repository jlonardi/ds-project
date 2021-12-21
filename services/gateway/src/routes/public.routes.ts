import express from 'express';
import { getOrderList, getProducts } from './service.routes';

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await getProducts();
  res.render('place-order', { products });
});

router.get('/orders', async (req, res) => {
  const orders = await getOrderList();
  res.render('order-list', { orders, success: !!req.query.success });
});

export const publicRoutes = router;
