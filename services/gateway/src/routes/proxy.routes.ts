import axios from 'axios';
import express from 'express';
import loadBalancers from '../../../config/lb.nodes.json';

const router = express.Router();

router.use('/products', async (_req, res) => {
  const productsResponse = await axios.get(`${loadBalancers.products}/products`);
  res.json(productsResponse.data);
});

export const proxyRoutes = router;
