import format from 'pg-format';
import { queryRowsAsync } from '../../../common/db-client/postgres';

interface Product {
  product_id: string;
  name: string;
}

export const getProducts = (): Promise<Product[]> => queryRowsAsync(`SELECT * FROM products`);

export const getSelectedProducts = (productIds: string) =>
  queryRowsAsync(
    format(
      `SELECT * FROM products
      WHERE product_id IN (%L)`,
      productIds
    )
  );
