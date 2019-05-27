import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => res.redirect('/hello'));

router.get('/landing', (_req, res) => res.render('welcome'));

export const publicRoutes = router;
