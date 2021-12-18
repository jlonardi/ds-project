import { queryAsync } from '../../../common/db-client/postgres';

interface Customer {
  user_id: string;
  name: string;
}

export const getCustomer = (userId: string): Promise<Customer[]> =>
  queryAsync<Customer>(
    `SELECT user_id, name
   FROM users
   WHERE user_id = $userId`,
    { userId }
  );

export const addCustomer = (userId: string, name: string): Promise<Customer[]> =>
  queryAsync<Customer>(
    `INSERT INTO users (user_id, name)
     VALUES ($userId, $name)`,
    { userId, name }
  );
