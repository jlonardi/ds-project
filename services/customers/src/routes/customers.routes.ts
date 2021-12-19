import express from 'express';
import { addCustomer, getCustomer, getAllCustomers } from '../operations/customers.operations';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const customer = await getCustomer(req.params.id);
  res.json(customer);
});

router.get('/', async (_req, res) => {
  const customers = await getAllCustomers();
  res.json(customers);
});

router.post('/', async (req, res) => {
  await addCustomer(req.body.id, req.body.name);
  res.sendStatus(200);
});

export const customersRoutes = router;
