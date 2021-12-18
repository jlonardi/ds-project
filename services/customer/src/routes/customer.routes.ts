import express from 'express';
import { addCustomer, getCustomer } from '../operations/customer.operations';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const customer = await getCustomer(req.params.id);
  res.json(customer);
});

router.post('/', async (req, res) => {
  await addCustomer(req.body.id, req.body.name);
  res.sendStatus(200);
});

export const customerRoutes = router;
