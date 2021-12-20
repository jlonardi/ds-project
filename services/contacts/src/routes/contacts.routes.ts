import express from 'express';
import {
  addContact,
  getContact,
  getAllContacts,
  deleteContact,
  commit
} from '../operations/contacts.operations';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const contact = await getContact(parseInt(req.params.id));
  res.json(contact);
});

router.get('/', async (_req, res) => {
  const contacts = await getAllContacts();
  res.json(contacts);
});

router.post('/', async (req, res) => {
  try {
    console.log('Adding contact with data: ', req.body);
    const { contact_id } = await addContact(req.body.email, req.body.name, req.body.address);

    setTimeout(async () => {
      console.log('Timeout expired - checking if contact is committed');
      const contact = await getContact(contact_id);
      if (!contact.committed) {
        console.log(`Contact id ${contact.contact_id} not committed - rolling back`);
        await deleteContact(contact.contact_id);
        console.log(`Contact rollback complete`);
      } else {
        console.log('Contact has been committed');
      }
    }, 15000);

    res.send({ contact_id });
  } catch {
    res.status(500).send('Server error');
  }
});

router.get('/commit/:id', async (req, res) => {
  console.log('Committing contact with id:', req.params.id);
  try {
    await commit(parseInt(req.params.id));
    res.send(200);
  } catch {
    res.status(500).send('Commit Failed');
  }
});

export const contactsRoutes = router;
