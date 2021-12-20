import { queryAsync, queryRowsAsync } from '../../../common/db-client/postgres';

interface Customer {
  id: number;
  name: string;
  email: string;
  address: string;
  committed: boolean;
}

export const getCustomer = (id: number): Promise<Customer> =>
  queryAsync(
    `SELECT id, name, email, address, committed
     FROM customers
     WHERE id = $id`,
    { id }
  );

export const addCustomer = (email: string, name: string, address: string): Promise<Customer> =>
  queryAsync(
    `INSERT INTO customers (email, name, address, committed)
     VALUES ($email, $name, $address, false)
     RETURNING id, email, name, address, committed`,
    { email, name, address }
  );

export const getAllCustomers = (): Promise<Customer[]> => queryRowsAsync(`SELECT * FROM customers`);

export const commit = (id: number) =>
  queryAsync(
    `UPDATE customers
     SET committed = true
     WHERE id=$id`,
    { id }
  );

export const deleteCustomer = (id: number) =>
  queryAsync(
    `DELETE FROM customers
    where id=$id`,
    { id }
  );
