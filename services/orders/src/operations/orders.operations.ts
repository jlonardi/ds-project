import format from 'pg-format';
import { queryAsync, queryRowsAsync } from '../../../common/db-client/postgres';

interface Order {
  order_id: string;
  contact_id: string;
  products: string[];
  created_at: string;
  committed: boolean;
}

interface RawOrder {
  order_id: string;
  contact_id: string;
  product_id: string;
  committed: boolean;
  created_at: string;
}

interface AccumulatorResult {
  [key: string]: any;
}

const cleanOrderResponse = (data: RawOrder[]) => {
  const res = data.reduce((prev, current) => {
    const currentItem = prev[current.order_id];
    if (currentItem) {
      return {
        ...prev,
        [current.order_id]: {
          ...currentItem,
          products: [...currentItem.products, current.product_id],
          committed: current.committed && currentItem.committed
        }
      };
    } else {
      return {
        ...prev,
        [current.order_id]: {
          created_at: current.created_at,
          order_id: current.order_id,
          contact_id: current.contact_id,
          products: [current.product_id],
          committed: current.committed
        }
      };
    }
  }, {} as AccumulatorResult);

  const clean = Object.keys(res).map(key => res[key]);

  return clean;
};

export const getOrder = async (order_id: string): Promise<Order> => {
  const res: RawOrder[] = await queryRowsAsync(
    `SELECT *
     FROM orders
     WHERE order_id = $order_id`,
    { order_id }
  );

  return cleanOrderResponse(res)[0];
};

export const addOrder = (order_id: string, contact_id: string, products: string[]) =>
  queryAsync(
    format(
      `INSERT INTO orders (order_id, contact_id, product_id)
       VALUES %L`,
      products.map(product_id => [order_id, contact_id, product_id])
    )
  );

export const getAllOrders = async () => {
  const res = await queryRowsAsync(`SELECT * FROM orders`);
  return cleanOrderResponse(res);
};

export const commit = (order_id: string) =>
  queryAsync(
    `UPDATE orders
     SET committed = true
     WHERE order_id=$order_id`,
    { order_id }
  );

export const deleteOrder = (order_id: string) =>
  queryAsync(
    `DELETE FROM orders
    where order_id=$order_id`,
    { order_id }
  );
