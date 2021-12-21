import axios from 'axios';
import express from 'express';

const loadBalancers = JSON.parse(process.env.LB_SERVERS || '{}');

const router = express.Router();
interface OrderEntry {
  contact_id: string;
  products: string[];
  order_id: string;
  created_at: string;
}

interface ProductEntry {
  product_id: string;
  name: string;
}

interface ContactEntry {
  name: string;
  email: string;
  address: string;
}

export const getSelectedProducts = async (products: string[]): Promise<ProductEntry[]> => {
  const contactResponse = await axios.post(`${loadBalancers.products}/products`, { products });
  return contactResponse.data;
};

export const getProducts = async () => {
  const productsResponse = await axios.get(`${loadBalancers.products}/products`);
  return productsResponse.data;
};

export const getOrders = async () => {
  const ordersResponse = await axios.get(`${loadBalancers.orders}/orders`);
  return ordersResponse.data;
};

export const getContanct = async (id: string): Promise<ContactEntry> => {
  const contactResponse = await axios.get(`${loadBalancers.contacts}/contacts/${id}`);
  return contactResponse.data;
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

export const getOrderList = async () => {
  const rawOrders = await getOrders();
  const orderList = rawOrders.map(async (order: OrderEntry) => {
    const { products, contact_id, order_id, created_at } = order;
    const fetchedProducts = await getSelectedProducts(products);
    const { name, address, email } = await getContanct(contact_id);
    const timestamp = new Date(created_at);
    const date = timestamp.toLocaleDateString('fi-FI');
    const time = new Date(created_at).toLocaleTimeString('fi-FI');
    return {
      order_id,
      created_at: `${date} ${time}`,
      products: fetchedProducts.map(product => product.name),
      name,
      address,
      email
    };
  });

  return Promise.all(orderList);
};

router.get('/list-orders', async (_req, res) => {
  res.json(await getOrderList());
});

export const proxyRoutes = router;
