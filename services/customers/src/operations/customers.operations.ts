import { queryAsync, queryRowsAsync } from '../../../common/db-client/postgres';

interface Customer {
  customer_id: string;
  name: string;
}

export const getCustomer = (customerId: string): Promise<Customer[]> =>
  queryAsync<Customer>(
    `SELECT customer_id, name
     FROM customers
     WHERE customer_id = $customerId`,
    { customerId }
  );

export const addCustomer = (customerId: string, name: string): Promise<Customer[]> =>
  queryAsync<Customer>(
    `INSERT INTO customers (customer_id, name, commited)
     VALUES ($customerId, $name, false)`,
    { customerId, name }
  );

export const getAllCustomers = (): Promise<Customer[]> =>
  queryRowsAsync<Customer>(`SELECT * FROM customers`);
