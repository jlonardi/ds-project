import express from 'express';
import { PromiseRejectionError } from '../../../common/errors/promise-rejection-error';
import { getOrderList, getProducts } from './service.routes';

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const products = await getProducts();
    res.render('place-order', { products });
  } catch (err) {
    next(new PromiseRejectionError(err as Error));
  }
});

router.get('/orders', async (req, res, next) => {
  try {
    const orders = await getOrderList();
    res.render('order-list', { orders, success: !!req.query.success });
  } catch (err) {
    next(new PromiseRejectionError(err as Error));
  }
});

export const publicRoutes = router;
