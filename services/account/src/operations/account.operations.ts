import { queryAsync } from '../../../common/db-client/postgres';

interface Account {
  user_id: string;
  name: string;
}

export const getAccount = (userId: string): Promise<Account[]> =>
  queryAsync<Account>(
    `SELECT user_id, name
   FROM users
   WHERE user_id = $userId`,
    { userId }
  );

export const addAccount = (userId: string, name: string): Promise<Account[]> =>
  queryAsync<Account>(
    `INSERT INTO users (user_id, name)
     VALUES ($userId, $name)`,
    { userId, name }
  );
