// tslint:disable-next-line:no-var-requires
require('dotenv').config();
import { Pool, QueryResult } from 'pg';
import named, { IQueryObject, PatchedClient } from 'node-postgres-named';
import { SQLError } from '../errors/sql-error';
import { logger } from '../utils/logger';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

interface IAsyncClient {
  queryAsync(queryString: string, values?: IQueryObject): Promise<any[]>;
}

const queryAsyncWithTx = async (tx: PatchedClient, queryString: string, values?: IQueryObject) =>
  tx.query(queryString, values).then((res: QueryResult) => res.rows);

const logQuery = (queryString: string, values?: IQueryObject) => {
  logger.info('SQL query string:');
  logger.info(queryString);
  logger.info('Passed values:', values);
};

const getQueryAsyncWithTx = (client: PatchedClient) => ({
  queryAsync: (queryString: string, values?: IQueryObject) => {
    logQuery(queryString, values);
    return queryAsyncWithTx(client, queryString, values);
  }
});

const getConnection = async <T>(fn: (client: IAsyncClient) => Promise<T[]>) => {
  const originalClient = await pool.connect();
  const client = named.patch(originalClient);
  try {
    await client.query('BEGIN');
    const result = await fn(getQueryAsyncWithTx(client));
    await client.query('COMMIT');

    return result;
  } catch (error) {
    logger.error('Transaction failed. Rollbacking tranasction.');
    await client.query('ROLLBACK');
    logger.error(error);
    throw new SQLError(error as string);
  } finally {
    client.release();
  }
};

export const queryRowsAsync = <T>(queryString: string, values?: IQueryObject): Promise<T[]> =>
  getConnection((client: IAsyncClient) => client.queryAsync(queryString, values));

export const queryAsync = <T>(queryString: string, values?: IQueryObject): Promise<T[]> =>
  getConnection(
    async (client: IAsyncClient): Promise<any> => {
      const rows = await client.queryAsync(queryString, values);
      return rows[0];
    }
  );

pool.on('error', err => {
  logger.error('An idle client has experienced an error', err.stack);
});
