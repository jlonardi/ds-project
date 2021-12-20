import { queryAsync, queryRowsAsync } from '../../../common/db-client/postgres';

interface Contact {
  contact_id: number;
  name: string;
  email: string;
  address: string;
  committed: boolean;
}

export const getContact = (contact_id: number): Promise<Contact> =>
  queryAsync(
    `SELECT contact_id, name, email, address, committed
     FROM contacts
     WHERE contact_id = $contact_id`,
    { contact_id }
  );

export const addContact = (email: string, name: string, address: string): Promise<Contact> =>
  queryAsync(
    `INSERT INTO contacts (email, name, address)
     VALUES ($email, $name, $address)
     RETURNING contact_id, email, name, address, committed`,
    { email, name, address }
  );

export const getAllContacts = (): Promise<Contact[]> => queryRowsAsync(`SELECT * FROM contacts`);

export const commit = (contact_id: number) =>
  queryAsync(
    `UPDATE contacts
     SET committed = true
     WHERE contact_id=$contact_id`,
    { contact_id }
  );

export const deleteContact = (contact_id: number) =>
  queryAsync(
    `DELETE FROM contacts
    where contact_id=$contact_id`,
    { contact_id }
  );
