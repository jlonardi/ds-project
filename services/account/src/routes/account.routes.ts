import express from 'express';
import { addAccount, getAccount } from '../operations/account.operations';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const account = await getAccount(req.params.id);
  res.json(account);
});

router.post('/', async (req, res) => {
  await addAccount(req.body.id, req.body.name);
  res.sendStatus(200);
});

export const accountRoutes = router;
