import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  commit,
  getAllOrders,
  getOrder,
  addOrder,
  deleteOrder
} from '../operations/orders.operations';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const order = await getOrder(req.params.id);
  res.json(order);
});

router.get('/', async (_req, res) => {
  const orders = await getAllOrders();
  res.json(orders);
});

router.post('/', async (req, res) => {
  try {
    console.log('Adding order with data: ', req.body);
    const order_id = uuidv4();
    await addOrder(order_id, req.body.contact_id, req.body.products);

    setTimeout(async () => {
      console.log('Timeout expired - checking if order is committed');
      const order = await getOrder(order_id);
      if (!order.committed) {
        console.log(`Order id ${order.order_id} not committed - rolling back`);
        await deleteOrder(order.order_id);
        console.log(`Order rollback complete`);
      } else {
        console.log('Order has been committed');
      }
    }, 15000);

    res.send({ order_id });
  } catch {
    res.status(500).send('Server error');
  }
});

router.get('/commit/:id', async (req, res) => {
  console.log('Committing order with id:', req.params.id);
  try {
    await commit(req.params.id);
    res.send(200);
  } catch {
    res.status(500).send('Commit Failed');
  }
});

export const oderRoutes = router;
