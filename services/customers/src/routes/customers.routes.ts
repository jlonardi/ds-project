import express from 'express';
import {
  addCustomer,
  getCustomer,
  getAllCustomers,
  deleteCustomer,
  commit
} from '../operations/customers.operations';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const customer = await getCustomer(parseInt(req.params.id));
  res.json(customer);
});

router.get('/', async (_req, res) => {
  const customers = await getAllCustomers();
  res.json(customers);
});

router.post('/', async (req, res) => {
  try {
    console.log('Adding customer with data: ', req.body);
    const { customer_id: id } = await addCustomer(req.body.email, req.body.name, req.body.address);

    setTimeout(async () => {
      console.log('Timeout expired - checking if customer is committed');
      const customer = await getCustomer(id);
      if (!customer.committed) {
        console.log(`Customer id ${customer.customer_id} not committed - rolling back`);
        await deleteCustomer(customer.customer_id);
        console.log(`Customer rollback complete`);
      } else {
        console.log('Customer has been committed');
      }
    }, 15000);

    res.send({ id });
  } catch {
    res.status(500).send('Server error');
  }
});

router.get('/commit/:id', async (req, res) => {
  console.log('Committing customer with id:', req.params.id);
  try {
    await commit(parseInt(req.params.id));
    res.send(200);
  } catch {
    res.status(500).send('Commit Failed');
  }
});

export const customersRoutes = router;
