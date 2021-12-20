import { queryRowsAsync } from '../../../common/db-client/postgres';

interface Product {
  product_id: string;
  name: string;
}

export const getProducts = (): Promise<Product[]> => queryRowsAsync(`SELECT * FROM products`);
