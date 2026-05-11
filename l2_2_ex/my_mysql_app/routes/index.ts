import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', function(_req: Request, res: Response) {
  res.render('index', { title: 'Echo App' });
});

export default router;