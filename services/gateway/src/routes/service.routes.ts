import axios from 'axios';
import express from 'express';
import loadBalancers from '../../config/lb.nodes.json';

const router = express.Router();

export const getProducts = async () => {
  const productsResponse = await axios.get(`${loadBalancers.products}/products`);
  return productsResponse.data;
};

router.get('/products', async (_req, res) => {
  res.json(await getProducts());
});

interface OrderRequestBody {
  name: string;
  email: string;
  address: string;
  products: string[];
}

router.post('/place-order', async (req, res) => {
  const { name, email, address, products } = req.body as OrderRequestBody;
  const allDataExists = name && email && address && products;
  if (!allDataExists) {
    return res.status(500).send('Missing parameters');
  }

  try {
    const contactsResponse = await axios.post(`${loadBalancers.contacts}/contacts`, {
      name,
      email,
      address
    });

    const { contact_id } = contactsResponse.data;

    const ordersResponse = await axios.post(`${loadBalancers.orders}/orders`, {
      contact_id,
      products
    });

    const { order_id } = ordersResponse.data;

    await Promise.all([
      axios.get(`${loadBalancers.contacts}/contacts/commit/${contact_id}`),
      axios.get(`${loadBalancers.orders}/orders/commit/${order_id}`)
    ]);

    res.json({ order_id });
  } catch (err) {
    return res.status(500).send('Server error');
  }
});

router.get('/list-orders', async (_req, res) => {
  const ordersResponse = await axios.get(`${loadBalancers.orders}/orders`);
  res.json(ordersResponse.data);
});

export const proxyRoutes = router;
