import { queryAsync, queryRowsAsync } from '../../../common/db-client/postgres';

interface Customer {
  customer_id: number;
  name: string;
  email: string;
  address: string;
  committed: boolean;
}

export const getCustomer = (customer_id: number): Promise<Customer> =>
  queryAsync(
    `SELECT customer_id, name, email, address, committed
     FROM customers
     WHERE customer_id = $customer_id`,
    { customer_id }
  );

export const addCustomer = (email: string, name: string, address: string): Promise<Customer> =>
  queryAsync(
    `INSERT INTO customers (email, name, address)
     VALUES ($email, $name, $address)
     RETURNING customer_id, email, name, address, committed`,
    { email, name, address }
  );

export const getAllCustomers = (): Promise<Customer[]> => queryRowsAsync(`SELECT * FROM customers`);

export const commit = (customer_id: number) =>
  queryAsync(
    `UPDATE customers
     SET committed = true
     WHERE customer_id=$customer_id`,
    { customer_id }
  );

export const deleteCustomer = (customer_id: number) =>
  queryAsync(
    `DELETE FROM customers
    where customer_id=$customer_id`,
    { customer_id }
  );
