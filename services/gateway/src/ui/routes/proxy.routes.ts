import axios from 'axios';
import express from 'express';
import loadBalancers from '../../../config/lb.nodes.json';

const router = express.Router();

router.use('/catalog', async (_req, res) => {
  const catalogResponse = await axios.get(`${loadBalancers.catalog}/catalog`);
  res.json(catalogResponse.data);
});

export const proxyRoutes = router;
