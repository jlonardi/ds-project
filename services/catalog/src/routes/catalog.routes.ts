import express from 'express';
import { getCatalog } from '../operations/catalog.operations';

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await getCatalog();
  res.json(products);
});

export const catalogRoutes = router;
