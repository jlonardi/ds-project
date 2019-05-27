import express from 'express';
import { requiresAuthentication } from '../../routes/middlewares';

const router = express.Router();

router.use(requiresAuthentication);

router.get('/hello', (_req, res) => res.render('hello'));

export const privateRoutes = router;
