import format from 'pg-format';
import { queryAsync, queryRowsAsync } from '../../../common/db-client/postgres';

interface Order {
  order_id: number;
  contact_id: number;
  products: string[];
  committed: boolean;
}

interface RawOrder {
  order_id: number;
  contact_id: number;
  product_id: string;
  committed: boolean;
}

export const getOrder = async (order_id: string): Promise<Order> => {
  const res: RawOrder[] = await queryRowsAsync(
    `SELECT *
     FROM orders
     WHERE order_id = $order_id`,
    { order_id }
  );

  return {
    order_id: res[0].order_id,
    contact_id: res[0].contact_id,
    products: res.map(entry => entry.product_id),
    committed: res.map(entry => entry.committed).reduce((prev, curr) => prev && curr)
  };
};

export const addOrder = (order_id: string, contact_id: string, products: string[]) =>
  queryAsync(
    format(
      `INSERT INTO orders (order_id, contact_id, product_id)
       VALUES %L`,
      products.map(product_id => [order_id, contact_id, product_id])
    )
  );

export const getAllOrders = (): Promise<Order[]> => queryRowsAsync(`SELECT * FROM orders`);

export const commit = (order_id: string) =>
  queryAsync(
    `UPDATE orders
     SET committed = true
     WHERE order_id=$order_id`,
    { order_id }
  );

export const deleteOrder = (order_id: number) =>
  queryAsync(
    `DELETE FROM orders
    where order_id=$order_id`,
    { order_id }
  );
