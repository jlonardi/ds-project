import { queryRowsAsync } from '../../../common/db-client/postgres';

interface Product {
  product_id: string;
  name: string;
}

export const getCatalog = (): Promise<Product[]> =>
  queryRowsAsync<Product>(`SELECT * FROM products`);
